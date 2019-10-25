import React, { useState, useEffect } from "react";
import {connect} from 'react-redux'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
  ListGroup, ListGroupItem,
  ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from "reactstrap";
import firebase from "firebase";
import Swal from "sweetalert2";
import _ from 'lodash'
import localStorage from 'local-storage'

const Header = props => {
  const [modal, setModal] = useState(false);
  const [modalWishlists, setModalWishlists] = useState(false);
  const [name, setName] = useState("");
  const [user, setUser] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [addressAdoption, setAddressAdoption] = useState("");
  const [errorPassword, setErrorPassword] = useState(true);
  const [errorRePassword, setErrorRePassword] = useState(true);
  const [errorName, setErrorName] = useState(true);
  const [errorEmail, setErrorEmail] = useState(true);
  const [errorPhone, setErrorPhone] = useState(true);
  const [errorRegister, setErrorRegister] = useState(true);
  const [errorAddressAdoption, setErrorAddressAdoption] = useState(true);
  const [errorSignIn, setErrorSignIn] = useState(true);
  const [sendingForm, setSendingForm] = useState(false);
  const [dropdownOpen, setOpen] = useState(false);
  const [animalsWishlist, setAnimalsWishlist] = useState([]);

  const regexEmail = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );
  const regexPhone = RegExp(/^08[0-9]{9,11}$|^02[0-9]{9,11}$/g);

  const toggle = () => setModal(!modal);
  const toggleWishlists = () => {
    setAnimalsWishlist(props.animalsData)
    setModalWishlists(!modalWishlists)
  }
  const dropdownToggle = () => setOpen(!dropdownOpen);

  useEffect(() => {
    if (localStorage.get('user')) setUser(localStorage.get('user'))
  }, [])

  const showModalRegister = () => {
    return (
      <Modal
        isOpen={modal}
        toggle={toggle}
        className="modal-dialog modal-dialog-centered"
      >
        <ModalHeader>Register</ModalHeader>
        <ModalBody>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label htmlFor="inputName4">Name</label>
              <input
                type="text"
                class="form-control"
                id="inputName4"
                placeholder="Name"
                style={errorName.length ? { borderColor: "red" } : null}
                onChange={event => {
                  event.target.value.length < 3
                    ? setErrorName("Length must be greater than 3")
                    : setErrorName(false);
                  setName(event.target.value);
                }}
              />
              {errorName.length ? (
                <p style={{ color: "red" }}>{errorName}</p>
              ) : null}
            </div>
            <div class="form-group col-md-6">
              <label htmlFor="inputEmail4">Email</label>
              <input
                type="email"
                class="form-control"
                id="inputEmail4"
                placeholder="Email"
                style={errorEmail.length ? { borderColor: "red" } : null}
                onChange={event => {
                  !regexEmail.test(event.target.value)
                    ? setErrorEmail("Email is not valid")
                    : setErrorEmail(false);
                  setEmail(event.target.value);
                }}
              />
              {errorEmail.length ? (
                <p style={{ color: "red" }}>{errorEmail}</p>
              ) : null}
            </div>
          </div>
          <div class="form-group">
            <label htmlFor="inputName4">Phone Number</label>
            <input
              type="text"
              class="form-control"
              id="inputName4"
              placeholder="Your number"
              style={errorPhone.length ? { borderColor: "red" } : null}
              onChange={event => {
                !regexPhone.test(event.target.value)
                  ? setErrorPhone("Phone number is not valid")
                  : setErrorPhone(false);
                setPhone(event.target.value);
              }}
            />
            {errorPhone.length ? (
              <p style={{ color: "red" }}>{errorPhone}</p>
            ) : null}
          </div>
          <div class="form-group">
            <label for="exampleFormControlTextarea1">Address</label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="Address"
              style={
                errorAddressAdoption.length ? { borderColor: "red" } : null
              }
              onChange={event => {
                event.target.value.length < 10
                  ? setErrorAddressAdoption("Length must be greater than 10")
                  : setErrorAddressAdoption(false);
                setAddressAdoption(event.target.value);
              }}
            />
            {errorAddressAdoption.length ? (
              <p style={{ color: "red" }}>{errorAddressAdoption}</p>
            ) : null}
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label htmlFor="inputName4">Password</label>
              <input
                type="password"
                class="form-control"
                id="inputName4"
                placeholder="Password"
                style={errorPassword.length ? { borderColor: "red" } : null}
                onChange={event => {
                  event.target.value.length < 6
                    ? setErrorPassword("Length min 6")
                    : setErrorPassword(false);
                  setPassword(event.target.value);
                }}
              />
              {errorPassword.length ? (
                <p style={{ color: "red" }}>{errorPassword}</p>
              ) : null}
            </div>
            <div class="form-group col-md-6">
              <label htmlFor="inputEmail4">Re Password</label>
              <input
                type="password"
                class="form-control"
                id="inputEmail4"
                placeholder="Re Password"
                style={errorRePassword.length ? { borderColor: "red" } : null}
                onChange={event => {
                  password !== event.target.value
                    ? setErrorRePassword(
                      "Password and Re Password does not match!"
                    )
                    : setErrorRePassword(false);
                  setRePassword(event.target.value);
                }}
              />
              {errorRePassword.length ? (
                <p style={{ color: "red" }}>{errorRePassword}</p>
              ) : null}
            </div>
          </div>
          {errorRegister.length ? (
            <p style={{ color: "red" }}>{errorRegister}</p>
          ) : null}
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={handleRegister}>
            Register {sendingForm ? <Spinner color="light" size="sm" /> : null}
          </Button>
          <Button color="danger" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  };

  useEffect(() => {
    getAnimalsWishlist()
  },[])

  const getAnimalsWishlist = async() => {
    let useruid = localStorage.get('user')
    let animalswish = []
    if(useruid){
      await firebase.firestore().collection('favorites').where('uid', '==', useruid.uid).get().then(querySnapshot => {
        querySnapshot.docs.map(data => animalswish.push(data.data()))
      })
      props.animalsData.push(...animalswish)
    }
  }

  const handleDeleteWishlist = (id) => {
    firebase.firestore().collection('favorites').doc(id.toString()).delete().then(async() => {
      let deletedAnimals = animalsWishlist.filter(animal => animal.animal.id !== id)
      await _.remove(props.animalsData, animalDat => animalDat.animal.id == id)
      await setAnimalsWishlist(deletedAnimals)
      Swal.fire(
        'Delete Successfuly',
        'waiting for update',
        'success'
      )
    })
  }

  const showModalWishlists = () => {
    return (
      <Modal
        isOpen={modalWishlists}
        toggle={toggleWishlists}
        scrollable={true}
        className="modal-dialog modal-dialog-centered"
      >
        <ModalHeader>Wishlists</ModalHeader>
        <ModalBody>
          <ListGroup>
            { 
              (animalsWishlist.length) ?
                animalsWishlist.map(animal => (
                  <ListGroupItem>
                    <img src={animal.animal.photos.length ? animal.animal.photos[0].small : null} alt="s" style={{ width: 50, height: 50, marginRight: 15 }} />
                    {animal.animal.name}
                    <span style={{ marginLeft: 15, cursor: 'pointer', color: 'red' }} onClick={() => handleDeleteWishlist(animal.animal.id)}>Delete</span>
                  </ListGroupItem>
                ))
              : null
            }
          </ListGroup>
        </ModalBody>
      </Modal>
    );
  };

  const handleRegister = async () => {
    if (name.length < 3) {
      setErrorName("Length must be greater than 3");
    }
    if (!regexEmail.test(email)) {
      setErrorEmail("Email is not valid");
    }
    if (!regexPhone.test(phone)) {
      setErrorPhone("Phone number is not valid");
    }
    if (addressAdoption.length < 10) {
      setErrorAddressAdoption("Length must be greater than 10");
    }
    if (password.length < 6) {
      setErrorPassword("Length min 6");
    }
    if (rePassword.length < 6) {
      setErrorRePassword("Length min 6");
    }

    if (
      !errorName &&
      !errorEmail &&
      !errorPhone &&
      !errorAddressAdoption &&
      !errorPassword &&
      !errorRePassword
    ) {
      setSendingForm(true);
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(result => {
          result.user.updateProfile({ displayName: name })
          addUserDetails(result.user.uid)
        })
        .catch(err => {
          setErrorRegister(err);
          setSendingForm(false);
        });
    }
  };

  const addUserDetails = async (uid) => {
    await firebase.firestore().collection("userDetails").add({ uid: uid, phone: phone, address: addressAdoption }).then(async () => {
      setSendingForm(false)
      let dataUser = {
        uid: uid,
        name: name,
        email: email,
        phone: phone,
        address: addressAdoption
      }
      await localStorage.set('user', dataUser)
      setUser(dataUser)
      Swal.fire('Register Success', 'please wait...', "success").then(() => {
        setModal(false)
      })
    }).catch(err => console.log(err))
  }

  const handleSignIn = () => {
    setSendingForm(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (result) => {
        setSendingForm(false);
        firebase.firestore().collection('userDetails').where("uid", "==", result.user.uid).get().then(function (querySnapshot) {
          querySnapshot.forEach(async doc => {
            let data = doc.data()
            let dataUser = {
              uid: result.user.uid,
              name: result.user.displayName,
              email: result.user.email,
              phone: data.phone,
              address: data.address
            }
            await localStorage.set('user', dataUser)
            setUser(dataUser)
          });
        })
      })
      .catch(err => {
        setErrorSignIn(err);
      });
  };

  const handleSignout = async () => {
    setSendingForm(true);
    await localStorage.remove('user')
    await setUser(false)
    await firebase
      .auth()
      .signOut()
      .then(() => setSendingForm(false));
  };


  
  return (
    <nav className="navbar header">
      <a href="/" className="navbar-brand logo">
        PetCall
      </a>
      <span>
        {!user ? (
          <React.Fragment>
            <div className="row">
              <div className="col-4"></div>
              <div className="col-3 p-1">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  style={errorSignIn.length ? { borderColor: "red" } : null}
                  onChange={event => {
                    setEmail(event.target.value);
                    setErrorSignIn(false);
                  }}
                />
              </div>
              <div className="col-3 p-1">
                <input
                  type="password"
                  className="form-control"
                  placeholder="password"
                  style={errorSignIn.length ? { borderColor: "red" } : null}
                  onChange={event => {
                    setPassword(event.target.value);
                    setErrorSignIn(false);
                  }}
                />
              </div>
              <div className="col-2 p-1">
                <Button color="success" onClick={handleSignIn}>
                  Login{" "}
                  {sendingForm ? <Spinner color="light" size="sm" /> : null}
                </Button>
              </div>
            </div>
            <div className="row">
              <div className="col-4"></div>
              <p style={{ marginLeft: 5, marginBottom: 0, color: "white" }}>
                You don't have account ?{" "}
                <span
                  style={{
                    color: "white",
                    textDecoration: "underline",
                    cursor: "pointer"
                  }}
                  onClick={toggle}
                >
                  Register
                </span>
              </p>
            </div>
          </React.Fragment>
        ) : (
            <React.Fragment>
              <ButtonDropdown isOpen={dropdownOpen} toggle={dropdownToggle} style={{ marginRight: 50 }}>
                <DropdownToggle caret style={{ backgroundColor: 'transparent', border: 'none', textAlign: 'right', marginRight: 20, fontWeight: 'bold' }}>
                  {user.name}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={toggleWishlists}>Wishlists</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={handleSignout}>
                    <span style={{ color: 'red' }}>Logout</span> 
                    {sendingForm ? <Spinner color="light" size="sm" /> : null}
                  </DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
              {/* <div className="row">
                <p style={{ color: "white" }}>Hello, {user.name}</p>
                <Button color="danger" onClick={handleSignout}>
                  Logout{" "}
                  {sendingForm ? <Spinner color="light" size="sm" /> : null}
                </Button>
              </div> */}
            </React.Fragment>
          )}
      </span>
      {showModalRegister()}
      {showModalWishlists()}
    </nav>
  );
};

const mapStateToProps = state => {
  return {
    animalsData : state.animals.animals
  }
}

export default connect(mapStateToProps)(Header);
