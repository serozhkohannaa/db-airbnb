import React, { FC, FormEvent } from 'react';
import './AddComment.scss';
import { CommentInterface } from "../../constants/comment.interface";

interface Props {
  closeModal: Function;
  getComment: Function;
  id: string;
  reviewer_name?: HTMLInputElement | null;
  listing_id?: HTMLInputElement | null;
  reviewer_id?: HTMLInputElement | null;
  comments?: HTMLTextAreaElement | null;
}

const AddComment: FC<Props> = ({closeModal, getComment, id, reviewer_name, listing_id, reviewer_id, comments}) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

	let newComment = {
	  reviewer_name: reviewer_name?.value,
	  listing_id: listing_id?.value,
	  reviewer_id: reviewer_id?.value,
	  comments: comments?.value
	}

	if (newComment.comments !== '') {
	  closeModal();
	  getComment(newComment);
	}
  }

  const handleClose = () => {
	closeModal();
  }

  return <div className='modal-wrapper' >
	<form className="modal" onSubmit={handleSubmit}>
	  <div className="title">Add new comment</div>
	  <div className="input">
		<label htmlFor="name">Name</label>
		<input id={'name'}  ref={(input) => reviewer_name = input} type="text" value='Hanna' disabled/>
	  </div>
	  <div className="input">
		<label htmlFor="listing_id">listing_id</label>
		<input id='listing_id' ref={(input) => listing_id = input} type="text" value={id} disabled/>
	  </div>
	  <div className="input">
		<label htmlFor="reviewer_id">reviewer_id</label>
		<input id='reviewer_id' ref={(input) => reviewer_id = input} type="text" value='1001' disabled/>
	  </div>
	  <div className="input">
		<label htmlFor="reviewer_id">Comments</label>
		<textarea name="comments" ref={(input) => comments = input} minLength={10} id='reviewer_id'/>
	  </div>
	  <button className='button'>Add comment</button>
	</form>
	<div className="close-modal" onClick={handleClose}/>
  </div>
}

export default AddComment;