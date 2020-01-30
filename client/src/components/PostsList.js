import React, { Component } from "react";
import {
  Container,
  Button,
  Card,
  CardTitle,
  CardText,
  Col,
  CardBody,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner
} from "reactstrap";
import ImageLoader from "react-loading-image";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faInfo } from "@fortawesome/free-solid-svg-icons";
import { getPosts, deletePost } from "../actions/postActions";
import PropTypes from "prop-types";

class PostsList extends Component {
  state = {
    _id: "",
    modal: false
  };
  componentDidMount() {
    this.props.getPosts();
  }

  toggle = id => {
    // Set the modal and the ID of the post to delete
    this.setState({ modal: !this.state.modal, _id: id });
  };

  onDeleteClick = () => {
    this.props.deletePost(this.state._id);
    this.setState({ _id: "" });
    this.toggle();
  };

  truncateString = (str, num) => {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  render() {
    const { posts } = this.props;
    return (
      <Container>
        <Row>
          {posts.map(({ _id, title, body, imgId }) => (
            <Col key={_id} style={{ marginBottom: "30px" }} md="4">
              <Card>
                {imgId && (
                  <ImageLoader
                    width="100%"
                    image={props => <img {...props} width="100%" alt={imgId} />}
                    src={`https://picsum.photos/id/${imgId}/200`}
                    loading={props => (
                      <Container>
                        <Row
                          style={{
                            height: "200px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                          }}
                        >
                          <Spinner size="sm" color="secondary" />
                        </Row>
                      </Container>
                    )}
                    error={() => <div>Error..</div>}
                  />
                )}
                <CardBody>
                  <CardTitle style={{ height: "40px" }}>{title}</CardTitle>
                  <CardText style={{ height: "70px" }}>
                    {this.truncateString(body, 50)}
                  </CardText>
                  <div className="card-actions">
                    <Button
                      onClick={() =>
                        this.props.history.push(`posts/${_id}`, { _id })
                      }
                    >
                      <FontAwesomeIcon
                        icon={faInfo}
                        style={{ marginRight: "10px" }}
                      />
                      Read More
                    </Button>
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="sm"
                      onClick={this.toggle.bind(this, _id)}
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        style={{ marginRight: "10px" }}
                      />
                      Delete
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Delete Post</ModalHeader>
          <ModalBody>Are you sure you want to delete the post?</ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.onDeleteClick.bind(this)}>
              Yes
            </Button>{" "}
            <Button color="secondary" onClick={this.toggle}>
              No
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    );
  }
}

PostsList.propTypes = {
  getPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts.posts
});

export default connect(mapStateToProps, { getPosts, deletePost })(PostsList);
