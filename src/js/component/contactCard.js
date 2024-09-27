import React, { useEffect,useContext, useState } from "react";
import { Context } from "../../js/store/appContext";
export  const ContactCard = (props) => { 
	const {store,actions}=useContext(Context);
	const [showDeleteModal,setShowDeleteModal]=useState(false);
	const [showEditModal,setShowEditModal]=useState(false);
	const [name,setName]=useState(props.contact.name);
	const [phone,setPhone]=useState(props.contact.phone);
	const [email,setEmail]=useState(props.contact.email);
	const [address,setAddress]=useState(props.contact.address);
	useEffect(()=>{
		if(store.deleteContact!=null){
			actions.deleteContact(store.deleteContact);
			console.log(edit);
			const newContact = [
				...store.contacts.slice(0, parseInt(store.deleteContact)), 
				...store.contacts.slice( parseInt(store.deleteContact) + 1) 
			];
			actions.setContacts(newContact);
			actions.setDeleteContact(null);
		}
		if(store.editContact!=null){
			actions.editContact(store.editContact);
			const newContacts = [
				...store.contacts.slice(0, parseInt(store.editIndex)), 
				store.editContact,
				...store.contacts.slice( parseInt(store.editIndex) + 1) 
			];
			actions.setContacts(newContacts);
			actions.setEditContact(null);
			actions.setEditIndex(null);
		}
	},[store.deleteContact,store.editContact]);

	return (
		<>
		<li className="list-group-item">
		<div className="row w-100">
			<div className="col-12 col-sm-6 col-md-3 px-0">
				<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaQ3G-YJjoF9SdMYLSg5ZZdtgrt2Xrnax17aSfBZtRVfV1YykSMYw3fRJaTQ&s" alt={props.contact.name} className="rounded-circle mx-auto d-block img-fluid" />
			</div>
			<div className="col-12 col-sm-6 col-md-9 text-center text-sm-left">
				<div className=" float-right">
					<button className="btn" onClick={()=>setShowEditModal(true)}><i className="fas fa-pencil-alt mr-3"></i></button>
					<button id={props.index} className="btn" onClick={() => setShowDeleteModal(true)}><i className="fas fa-trash-alt"></i></button>
				</div>
				<label className="name lead">{props.contact.name}</label>
				<br /> 
				<i className="fas fa-map-marker-alt text-muted mr-3"></i>
				<span className="text-muted">{props.contact.address}</span>
				<br />
				<span className="fa fa-phone fa-fw text-muted mr-3" data-toggle="tooltip" title="" data-original-title="(870) 288-4149"></span>
				<span className="text-muted small">{props.contact.phone}</span>
				<br />
				<span className="fa fa-envelope fa-fw text-muted mr-3" data-toggle="tooltip" data-original-title="" title=""></span>
				<span className="text-muted small text-truncate">{props.contact.email}</span>
			</div>
		</div>
		</li>
		{showDeleteModal && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Are you sure?</h5>
                                <button
                                    type="button"
                                    className="close"
                                    aria-label="Close"
                                    onClick={() => setShowDeleteModal(false)}
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>If you delete this thing the entire universe will go down?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={()=>handleEdit}>
                                   Yes baby!
                                </button>
                                <button type="button" className="btn btn-secondary"  onClick={() => setShowDeleteModal(false)} >
                                    Oh no!
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
        )}
		{showEditModal && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit contact information</h5>
                                <button
                                    type="button"
                                    className="close"
                                    aria-label="Close"
                                    onClick={() => setShowEditModal(false)}
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
							<form>
                            <div className="modal-body">
							<div className="form-group">
								<label>Full Name</label>
								<input type="text" className="form-control" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)}/>
								</div>
								<div className="form-group">
									<label>Email</label>
									<input type="email" className="form-control" placeholder="Enter email" value={email} onChange={(e) =>setEmail(e.target.value)} />
								</div>
								<div className="form-group">
									<label>Phone</label>
									<input type="phone" className="form-control" placeholder="Enter phone" value={phone}  onChange={(e) => setPhone(e.target.value)}/>
								</div>
								<div className="form-group">
									<label>Address</label>
									<input type="text" className="form-control" placeholder="Enter address" value={address} onChange={(e) =>setAddress(e.target.value)}/>
								</div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={()=>{actions.setEditContact({"name":name,"email":email,"phone":phone,"address":address,"id":props.contact.id});setShowEditModal(false);actions.setEditIndex(props.index);}}>
                                  Edit
                                </button>
                                <button type="button" className="btn btn-secondary"  onClick={() => setShowEditModal(false)} >
                                    Cancel
                                </button>
                            </div>
							</form>
                        </div>
                    </div>
                </div>
        )}
		</>
	);
};
