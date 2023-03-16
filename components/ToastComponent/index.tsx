import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

import { setSuccessAddComment, getCommonData } from "../../store/slices/common";

const ToastComponent: React.FC = () => {
  const dispatch = useDispatch();
  const commonData = useSelector(getCommonData);

  return (
    <ToastContainer className="p-3" position="bottom-end">
      <Toast
        show={commonData?.successAddComment}
        onClose={() => dispatch(setSuccessAddComment({
          isSuccess: false,
          message: ''
        }))}
        delay={3000}
        autohide
        bg={commonData?.successAddComment ? 'success' : 'Danger'}
      >
        <Toast.Header>
          <strong className="me-auto">{commonData?.successAddComment ? 'Success' : 'Failed'}</strong>
        </Toast.Header>
        <Toast.Body>{commonData?.message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastComponent;
