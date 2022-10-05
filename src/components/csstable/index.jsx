import React, { Component } from "react";
import "./style.css";
import data from "../../mock";
import Dialog from "./dialog";

class CSSTable extends Component {
  state = {
    list: data,
    name: "",
    lastname: "",
    email: "",
    phone: "",
    selected: "id",
    search: "",
    edit: {},
    isLoading:false,
    message:"",
    idDelete:""
 
  };
  render() {

    const onDelete = (id) => {
      this.setState({isLoading:true})
      this.setState({message:`Are you sure you want to delete id:${id}`});
      this.setState({idDelete:id})
    };
    
  

    const onChangeAdd = ({ target: { value, name } }) => {
      this.setState({ [name]: value });
    };

    const onAdd = () => {
      if (
        this.state.name !== "" &&
        this.state.lastname !== "" &&
        this.state.email !== "" &&
        this.state.phone !== ""
      ) {
        let res = (this.state.list = [
          ...this.state.list,
          {
            id: this.state.list.length + 1,
            name: this.state.name,
            lastname: this.state.lastname,
            email: this.state.email,
            phone: this.state.phone,
          },
        ]);
        return this.setState({ list: res });
      } else {
        alert("Sorry, information is required");
      }
    };

    const onChangeselect = ({ target: { value } }) => {
      this.setState({ selected: value });
    };

    const onChangeSearch = ({ target: { value } }) => {
      this.setState({ search: value });
      if (value == "") {
        this.setState({ list: data });
      }
    };

    const onSearchBtn = () => {
      let res = this.state.list.filter((vl) =>
        vl[this.state.selected]
          .toString()
          .toLowerCase()
          .includes(this.state.search.toLowerCase())
      );
      return this.setState({ list: res });
    };

    const onEdit = (value) => {
      this.setState({ edit: value });
    };

    const onChangeEditInput = ({ target: { value, name } }) => {
      this.setState({ edit: { ...this.state.edit, [name]: value } });
    };

    const onSave = () => {
      let res = this.state.list.map((value) =>
        value.id == this.state.edit.id ? this.state.edit : value
      );
      return this.setState({ list: res, edit: {} });
    };

    const areSureDelete=(choose)=>{
     if(choose){
      this.setState({list:this.state.list.filter((vl)=>vl.id!==this.state.idDelete)});
      this.setState({isLoading:false})
     }else{
      this.setState({isLoading:false})
     }
    }

    return (
      <div className="main">
        <h1 className="main-title">Crud table in Css</h1>
        <div className="main-input-container">
          <div className="input-add-container">
            <div>
              <label className="label-txt">First Name:</label>
              <input
                onChange={onChangeAdd}
                className="main-inputs"
                type="text"
                placeholder="Enter Name"
                name="name"
              />
            </div>
            <div>
              <label className="label-txt">Last Name:</label>
              <input
                onChange={onChangeAdd}
                className="main-inputs"
                type="text"
                placeholder="Enter LastName"
                name="lastname"
              />
            </div>
            <div>
              <label className="label-txt">Email:</label>
              <input
                onChange={onChangeAdd}
                className="main-inputs"
                type="text"
                placeholder="Enter Email"
                name="email"
              />
            </div>
            <div>
              <label className="label-txt">Phone Number:</label>
              <input
                onChange={onChangeAdd}
                className="main-inputs"
                type="text"
                placeholder="Enter phone number"
                name="phone"
              />
            </div>
            <div>
              <button className="main-btn active " onClick={onAdd}>
                Add
              </button>
            </div>
          </div>
          {/* Search container */}

          <div className="input-serach-container">
            <div>
              <select className="search-select" onChange={onChangeselect}>
                <option value="id">Id</option>
                <option value="name">Name</option>
              </select>
            </div>
            <div>
              <label className="label-txt">Search information:</label>
              <input
                onChange={onChangeSearch}
                className="main-inputs"
                type="text"
                placeholder="Enter information"
              />
            </div>
            <div>
              <button className="main-btn active" onClick={onSearchBtn}>
                Search
              </button>
            </div>
          </div>
        </div>
        {/* {main-input-container end} */}

        {/* Table */}
        <div className="main-table">
          <div className="table-cont">
            <table>
              <thead>
                <tr>
                  <th className="table-th stick-left bg-stiky">ID</th>
                  <th className="table-th ">Name</th>
                  <th className="table-th ">LastName</th>
                  <th className="table-th ">Email</th>
                  <th className="table-th ">Phone</th>
                  <th className="table-th stiky-right bg-stiky">Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.list.map((value) => {
                  let res = this.state.edit.id == value.id;
                  return (
                    <tr key={value.id}>
                      <td className="stick-left bg-sticky-left-right ">
                        {value.id}
                      </td>
                      <td>
                        {res ? (
                          <input
                            className="edit-input"
                            defaultValue={this.state.edit.name}
                            onChange={onChangeEditInput}
                            name="name"
                          />
                        ) : (
                          value.name
                        )}
                      </td>
                      <td>
                        {res ? (
                          <input
                            className="edit-input"
                            defaultValue={this.state.edit.lastname}
                            onChange={onChangeEditInput}
                            name="lastname"
                          />
                        ) : (
                          value.lastname
                        )}
                      </td>
                      <td>
                        {res ? (
                          <input
                            className="edit-input"
                            defaultValue={this.state.edit.email}
                            onChange={onChangeEditInput}
                            name="email"
                          />
                        ) : (
                          value.email
                        )}
                      </td>
                      <td>
                        {res ? (
                          <input
                            className="edit-input"
                            defaultValue={this.state.edit.phone}
                            onChange={onChangeEditInput}
                            name="phone"
                          />
                        ) : (
                          value.phone
                        )}
                      </td>
                      <td className="stiky-right bg-sticky-left-right">
                        {res ? (
                          <>
                            <button
                              className="save-btn active"
                              onClick={onSave}
                            >
                              Save
                            </button>
                            <button
                              className="cancel-btn active"
                              onClick={() => this.setState({ edit: {} })}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="edit-btn active"
                              onClick={() => onEdit(value)}
                            >
                              Edit
                            </button>

                            <button
                              className="delete-btn active"
                              onClick={() => onDelete(value.id)}
                            >
                              {" "}
                              Delete
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        {this.state.isLoading && (
          <Dialog onDialog={(choose)=>areSureDelete(choose)}  message={this.state.message} />
        )}
      </div>
    );
  }
}

export default CSSTable;
