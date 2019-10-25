import React, { useState,useEffect } from "react";
import {connect} from 'react-redux'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  Spinner
} from "reactstrap";
import firebase from "firebase";
import Swal from "sweetalert2";
import localStorage from 'local-storage'
import _ from 'lodash'

const Card = props => {
  const animal = props.animal;
  const [wishlistIcon, setWishlistIcon] = useState(require('../Assets/Icons/like.png'))
  const [wishlist, setWishlist] = useState(false)
  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [addressAdoption, setAddressAdoption] = useState(null);
  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPhone, setErrorPhone] = useState(false);
  const [errorAddressAdoption, setErrorAddressAdoption] = useState(false);
  const [sendingForm, setSendingForm] = useState(false);

  const regexEmail = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );
  const regexPhone = RegExp(/^08[0-9]{9,11}$|^02[0-9]{9,11}$/g);
  // Carousel
  const next = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === animal.photos.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === 0 ? animal.photos.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = newIndex => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  // Modal
  const toggle = async () => {
    await props.animalsData.map(animalDat => {
      (animalDat.animal.id == animal.id) ? setWishlistIcon(require('../Assets/Icons/liked.png')) : setWishlistIcon(require('../Assets/Icons/like.png'))
    })
    setModal(!modal)
    console.log(props.animalsData)
  }

  const toggleNested = () => {
    if(localStorage.get('user')){
      let userData = localStorage.get('user')
      setNestedModal(!nestedModal);
      setName(userData.name)
      setPhone(userData.phone)
      setAddressAdoption(userData.address)
      setEmail(userData.email)
      setErrorAddressAdoption(false);
      setErrorEmail(false);
      setErrorName(false);
      setErrorPhone(false);
      setSendingForm(false);
      setCloseAll(false);
    }else{
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'You must be login for adoption pet!'
      })
    }
  };

  const slides = animal.photos.map(photo => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={photo.full}
      >
        <div style={{ textAlign: "center" }}>
          <img
            src={photo.full}
            alt="carousel"
            style={{ width: "100%", height: 350 }}
          />
        </div>
      </CarouselItem>
    );
  });

  const handleWishlist = async() => {
    setWishlist(!wishlist)
    const user = firebase.auth().currentUser
    if(wishlist){
      setWishlistIcon(require('../Assets/Icons/liked.png'))
      await firebase.firestore().collection('favorites').doc(animal.id.toString()).set({
        uid: user.uid,
        name: user.displayName,
        animal: animal
      }).then(async() => {
        props.animalsData.push({ uid: user.uid, name: user.displayName, animal: animal })
      }).catch(() => {
        setWishlistIcon(require('../Assets/Icons/like.png'))
      })
    }else{
      let checkData = props.animalsData.filter(animalDat => animalDat.animal.id == animal.id)
      if(checkData.length){
        await firebase.firestore().collection('favorites').doc(animal.id.toString()).delete().then(async () => {
          await _.remove(props.animalsData, animalDat => animalDat.animal.id == animal.id)
        }).catch(() => {
          setWishlistIcon(require('../Assets/Icons/liked.png'))
        })
      }
    }
  }

  const showModalDetails = () => {
    return (
      <Modal
        isOpen={modal}
        toggle={toggle}
        className="modal-dialog modal-lg modal-dialog-centered"
      >
        <div className="modal-header text-center" style={{ borderBottom: "none" }}>
          <h3 className="modal-title w-100" style={{ color: "#3C9D9B", marginRight: -10 }}>
            {animal.name}
          </h3>
          <p className="modal-title w-10" style={{ color: "#3C9D9B", cursor: 'pointer' }}>
            {
              (firebase.auth().currentUser) ? 
                <img src={wishlistIcon} alt="wishlists" width="25" height="25" onClick={handleWishlist} />
              :null
            }
          </p>
        </div>
        <ModalBody>
          <div style={{ width: "100%", marginBottom: 25, height: 350 }}>
            <div style={{ margin: "0 auto", width: "50%" }}>
              <Carousel
                activeIndex={activeIndex}
                next={next}
                previous={previous}
                ride="carousel"
                interval="5000"
                slide={false}
                className="carousel-fade"
              >
                {animal.photos.length > 1 ? (
                  <CarouselIndicators
                    items={animal.photos}
                    activeIndex={activeIndex}
                    onClickHandler={goToIndex}
                  />
                ) : null}
                {slides}
                {animal.photos.length > 1 ? (
                  <React.Fragment>
                    <CarouselControl
                      direction="prev"
                      directionText="Previous"
                      onClickHandler={previous}
                    />
                    <CarouselControl
                      direction="next"
                      directionText="Next"
                      onClickHandler={next}
                    />
                  </React.Fragment>
                ) : null}
              </Carousel>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <h5 style={{ color: "#3C9D9B" }}>Description</h5>
              <hr />
              <div dangerouslySetInnerHTML={{ __html: animal.description }} />
            </div>
            <div className="col-6">
              <h5 style={{ color: "#3C9D9B" }}>Contact Us</h5>
              <hr />
              <p>Email : {animal.contact.email}</p>
              {animal.contact.phone ? (
                <p>Phone : {animal.contact.phone}</p>
              ) : null}
            </div>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <p style={{ color: '#3C9D9B' }}>Age: <span style={{ color: 'black', fontSize: 13 }}>{animal.age}</span></p>
            <p style={{ color: '#3C9D9B' }}>Breeds: <span style={{ color: 'black', fontSize: 13 }}>{animal.breeds.primary}</span></p>
            <p style={{ color: '#3C9D9B' }}>Gender: <span style={{ color: 'black', fontSize: 13 }}>{animal.gender}</span></p>
            <p style={{ color: '#3C9D9B' }}>Size: <span style={{ color: 'black', fontSize: 13 }}>{animal.size}</span></p>
            <p style={{ color: '#3C9D9B' }}>Species: <span style={{ color: 'black', fontSize: 13 }}>{animal.species}</span></p>
          </div>
          {showModalFormAdoption()}
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={toggleNested}
            style={{ backgroundColor: "#3C9D9B", borderColor: "#3C9D9B" }}
          >
            Adoption
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  };

  const showModalFormAdoption = () => {
    return (
      <Modal
        isOpen={nestedModal}
        toggle={toggleNested}
        className="modal-dialog modal-dialog-centered"
        onClosed={closeAll ? toggle : undefined}
      >
        <ModalHeader>Form Pet Adoption</ModalHeader>
        <ModalBody>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputName4">Name</label>
              <input
                type="text"
                className="form-control"
                id="inputName4"
                placeholder="Name"
                style={errorName.length ? { borderColor: "red" } : null}
                value={name}
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
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail4">Email</label>
              <input
                type="email"
                className="form-control"
                Card   id="inputEmail4"
                value={email}
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
          <div className="form-group">
            <label htmlFor="inputName4">Phone Number</label>
            <input
              type="text"
              className="form-control"
              id="inputName4"
              placeholder="Your number"
              value={phone}
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
          <div className="form-group">
            <label for="exampleFormControlTextarea1">Address</label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              value={addressAdoption}
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
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={handleSendAdoptionData}>
            Send {sendingForm ? <Spinner color="light" size="sm" /> : null}
          </Button>
          <Button color="danger" onClick={toggleNested}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  };
  const handleSendAdoptionData = () => {
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

    if (!errorName && !errorEmail && !errorPhone && !errorAddressAdoption) {
      setSendingForm(true);
      firebase
        .firestore()
        .collection("adoptionUsers")
        .add({
          id_pet: animal.id,
          name: name,
          email: email,
          phone: phone,
          address: addressAdoption
        })
        .then(() => {
          setSendingForm(false);
          Swal.fire(
            "Thank you!",
            "Your data has been received!",
            "wait, we will contact you soon"
          ).then(() => {
            setNestedModal(false);
          });
        })
        .catch(err => console.log(err))
    }
  };

  return (
    <React.Fragment>
      <div onClick={toggle} key={animal.id}>
        <div
          className="card shadow bg-white"
          style={{
            width: "18rem",
            margin: "10px 10px",
            cursor: "pointer",
            backgroundImage: `url(${
              animal.photos.length
                ? animal.photos[0].large
                : "http://saveabandonedbabies.org/wp-content/uploads/2015/08/default.png"
            })`,
            backgroundSize: "100% 100%",
            height: "250px",
            borderRadius: 20,
            overflow: "hidden"
          }}
        >
          <div
            className="card-header bg-transparent"
            style={{ borderBottom: "none" }}
          >
          </div>
          <div className="card-body"></div>
          <div
            className="card-footer"
            style={{
              borderTop: "none",
              backgroundColor: "rgb(0, 0, 0, 0.5)",
              paddingTop: "0px",
              paddingBottom: "0px"
            }}
          >
            <p
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "white",
                marginBottom: 0,
                textAlign: "center"
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: animal.name }} />
            </p>
          </div>
        </div>
        {showModalDetails()}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    animalsData: state.animals.animals
  }
}

export default connect(mapStateToProps)(Card);
