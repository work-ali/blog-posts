import React, { Component } from "react";
import {
  Button,
  Container as FabContainer
} from "react-floating-action-button";
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { getPost } from "../actions/postActions";
import { Spinner } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import EditPost from "./EditPost";
import AppNavbar from "./AppNavbar";

class SinglePost extends Component {
  state = {
    id: this.props.location.state._id,
    modal: false
  };
  componentDidMount() {
    this.props.getPost(this.state.id);
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    const { isLoading, post } = this.props;
    return isLoading ? (
      <Container>
        <Row>
          <Col style={{ textAlign: "center" }} lg="12">
            <Spinner style={{ width: "3rem", height: "3rem" }} />
          </Col>
        </Row>
      </Container>
    ) : (
      <div>
        <AppNavbar />
        <Container>
          <Row>
            <Col lg="12">
              <img
                src={`https://picsum.photos/id/${post.imgId}/1000`}
                width="100%"
                height="350px"
                alt={post.imgId}
              />
            </Col>
          </Row>
          <Row>
            <Col lg="12">
              <h1>{post.title}</h1>
            </Col>
          </Row>
          <Row>
            <Col lg="12">
              <p>{post.body}</p>
            </Col>
          </Row>
        </Container>
        <FabContainer>
          <Button onClick={this.toggle} tooltip="Click to edit" rotate={true}>
            <FontAwesomeIcon icon={faPencilAlt} />
          </Button>
        </FabContainer>
        <EditPost toggle={this.toggle} post={post} modal={this.state.modal} />
      </div>
    );
  }
}

SinglePost.propTypes = {
  getPost: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    post: state.posts.post,
    isLoading: state.posts.loading
  };
};

export default connect(mapStateToProps, { getPost })(SinglePost);
