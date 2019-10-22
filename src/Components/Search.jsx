import React, { useState, useEffect } from "react";
import searchIcon from "../Assets/Icons/magnifying-glass.png";

const Search = props => {
  const client = props.client;
  const [text, setText] = useState("");
  const [petTypes, setPetTypes] = useState([]);
  const [coats, setCoats] = useState([]);
  const [colors, setColors] = useState([]);
  const [genders, setGenders] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [selectedCoat, setSelectedCoat] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);

  useEffect(() => {
    getPet()
  }, []);

  const getPet = () => {
    client.animalData
      .types()
      .then(res => {
        setPetTypes(res.data.types);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    client.animalData
      .type(selectedPet)
      .then(res => {
        setCoats(res.data.type.coats);
        setColors(res.data.type.colors);
        setGenders(res.data.type.genders);
      })
      .catch(err => {
        console.log(err);
      });
  }, [selectedPet]);

  const handleSelectedPet = event => {
    setSelectedPet(event.target.value);
  };

  const handleSelectedCoat = event => {
    setSelectedCoat(event.target.value);
  };

  const handleSelectedColor = event => {
    setSelectedColor(event.target.value);
  };

  const handleSelectedGender = event => {
    setSelectedGender(event.target.value);
  };

  return (
    <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
      <div className="row" style={{ marginLeft: 10, marginTop: 10 }}>
        <div className="col-12">
          <div class="input-group mb-5">
            <input
              type="text"
              className="form-control"
              plPetaceholder="Search pet here.."
              onChange={event => setText(event.target.value)}
              onKeyUp={event =>
                event.keyCode === 13
                  ? props.onHandleSearch(event.target.value)
                  : null
              }
            />
            <div
              class="input-group-append"
              style={{ cursor: "pointer" }}
              onClick={() => props.onHandleSearch(text)}
            >
              <span
                class="input-group-text"
                style={{
                  backgroundColor: "#3C9D9B",
                  color: "white",
                  borderColor: "#3C9D9B",
                  borderTopRightRadius: 20,
                  borderBottomRightRadius: 20
                }}
              >
                <img src={searchIcon} alt="s" width="15" height="15" />
              </span>
            </div>
          </div>
          <hr />
          <div className="mb-3 text-center">
            <h3>Filter</h3>
          </div>
          <div className="mb-3">
            <div class="form-group">
              <label for="exampleFormControlSelect1">Pet Type</label>
              <select
                class="form-control"
                id="exampleFormControlSelect1"
                onChange={handleSelectedPet}
              >
                <option value={false} hidden>
                  Choose your favorite pet
                </option>
                {petTypes.length
                  ? petTypes.map(type => (
                      <option value={type.name}>{type.name}</option>
                    ))
                  : null}
              </select>
            </div>
          </div>
          {selectedPet ? (
            <div>
              <div className="mb-3">
                <div class="form-group">
                  <label for="exampleFormControlSelect1">Coats</label>
                  <select
                    class="form-control"
                    id="exampleFormControlSelect1"
                    onChange={handleSelectedCoat}
                  >
                    <option value={false} hidden>
                      Choose coats
                    </option>
                    {coats.length
                      ? coats.map(coat => <option value={coat}>{coat}</option>)
                      : null}
                  </select>
                </div>
              </div>
              <div className="mb-3">
                <div class="form-group">
                  <label for="exampleFormControlSelect1">Colors</label>
                  <select
                    class="form-control"
                    id="exampleFormControlSelect1"
                    onChange={handleSelectedColor}
                  >
                    <option value={false} hidden>
                      Choose colors
                    </option>
                    {colors.length
                      ? colors.map(color => (
                          <option value={color}>{color}</option>
                        ))
                      : null}
                  </select>
                </div>
              </div>
              <div className="mb-3">
                <div class="form-group">
                  <label for="exampleFormControlSelect1">Genders</label>
                  <select
                    class="form-control"
                    id="exampleFormControlSelect1"
                    onChange={handleSelectedGender}
                  >
                    <option value={false} hidden>
                      Choose genders
                    </option>
                    {genders.length
                      ? genders.map(gender => (
                          <option value={gender}>{gender}</option>
                        ))
                      : null}
                  </select>
                </div>
              </div>
            </div>
          ) : null}
          <div
            className="mb-3 text-right"
            style={{ justifyContent: "space-evenly", display: "flex" }}
          >
            <button
              className="btn btn-danger"
              style={{ width: 110 }}
              onClick={() => {
                setPetTypes([]);
                getPet();
                setSelectedPet(null);
                setSelectedCoat(null);
                setSelectedColor(null);
                setSelectedGender(null);
                props.onHandleClear();
              }}
            >
              Clear
            </button>
            <button
              className="btn"
              style={{
                backgroundColor: "#3C9D9B",
                color: "white",
                width: 110
              }}
              onClick={() =>
                props.onHandleFilter({
                  limit: 9,
                  type: selectedPet,
                  color: selectedColor,
                  coat: selectedCoat,
                  gender: selectedGender
                })
              }
            >
              Save Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
