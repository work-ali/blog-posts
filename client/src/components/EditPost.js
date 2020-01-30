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
import { editPost, getPosts } from "../actions/postActions";

class EditPost extends Component {
  state = {
    title: this.props.title,
    body: this.props.body,
    imgId: 0
  };
  componentDidMount() {
    const { post } = this.props;
    this.setState({
      title: post.title,
      body: post.body,
      imgId: post.imgId
    });
  }

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
    this.props.editPost(this.props.post._id, newPost);
    // this.props.getPosts();
    // Close modal
    this.props.toggle();
  };

  render() {
    return (
      <div style={{ textAlign: "end" }}>
        <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
          <ModalHeader toggle={this.toggle}>Edit Your Blog</ModalHeader>
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
                  value={this.state.title}
                  placeholder="title"
                  onChange={this.onChange}
                />
                <Label for="item">Title</Label>
                <Input
                  type="textarea"
                  name="body"
                  id="body"
                  value={this.state.body}
                  placeholder="body"
                  onChange={this.onChange}
                  style={{ height: "172px" }}
                />
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Update
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

export default connect(mapStateToProps, { editPost, getPosts })(EditPost);
