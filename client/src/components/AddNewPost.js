import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  CardImg
} from "reactstrap";
import { connect } from "react-redux";
import { addPost } from "../actions/postActions";

class AddNewPost extends Component {
  state = {
    modal: false,
    title: "",
    body: "",
    imgId: 0
  };

  componentDidMount() {
    this.setState({
      imgId: Math.floor(Math.random() * 500)
    });
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { title, body, imgId } = this.state;
    const newPost = {
      title,
      body,
      imgId
    };
    this.props.addPost(newPost);

    // Close modal
    this.toggle();
  };

  render() {
    return (
      <div style={{ textAlign: "end" }}>
        <Button
          color="dark"
          style={{ marginBottom: "2rem" }}
          onClick={this.toggle}
        >
          Add New Post
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Add New Post To Your Blog
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <CardImg
                  top
                  width="100%"
                  src={`https://picsum.photos/id/${this.state.imgId}/500/150`}
                  alt="Card image cap"
                />

                <Label for="item">Title</Label>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="title"
                  onChange={this.onChange}
                />
                <Label for="item">Title</Label>
                <Input
                  type="textarea"
                  name="body"
                  id="body"
                  placeholder="body"
                  onChange={this.onChange}
                  style={{ height: "172px" }}
                />
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Save
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts.posts
});

export default connect(mapStateToProps, { addPost })(AddNewPost);
