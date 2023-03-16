import React, { useState } from "react";

import { useDispatch } from "react-redux";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import {
  setSuccessAddComment,
} from "../../store/slices/common";
import { CommentDataType, ListCommentType, CommentStorageType } from "../../types";

type Props = {
  onClose: Function;
  id: string;
};

const CommentModal: React.FC<Props> = ({ onClose, id }) => {
  const dispatch = useDispatch();

  const [comment, setComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const AddComment = () => {
    setLoading(true);
    setTimeout(() => {
      const newComment: CommentDataType = {
        senderUsername:
          JSON.parse(localStorage.getItem("userData"))?.username || "",
        comment,
      };

      let itemComment: CommentStorageType | null = JSON.parse(
        localStorage.getItem("userComments")
      );

      if (itemComment !== null) {
        const itemCommentIndex = (itemComment.comments || []).findIndex(
          (el: ListCommentType) => el.movieId === id
        );

        if (itemCommentIndex !== -1) {
          itemComment.comments[itemCommentIndex].listComment.push(newComment);
        } else {
          itemComment.comments.push({
            movieId: id,
            listComment: [newComment],
          });
        }
      } else {
        itemComment = {
          comments: [
            {
              movieId: id,
              listComment: [newComment],
            },
          ],
        }
      }

      localStorage.setItem("userComments",JSON.stringify(itemComment));
      dispatch(setSuccessAddComment({
        isSuccess: true,
        message: 'Success adding a comment!'
      }));
      onClose();
      setLoading(false)
    }, 800);
  };

  return (
    <Modal show={!!id} onHide={() => onClose()}>
      <Modal.Header closeButton>
        <Modal.Title>Add comment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={(e) => setComment(e?.target?.value)}
              disabled={loading}
              required
            />
          </Form.Group>
        </Form>
        <Button variant="secondary" onClick={() => onClose()}>
          Close
        </Button>
        <Button disabled={loading} className="mx-2" variant="primary" onClick={() => AddComment()}>
          Save Changes
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default CommentModal;
