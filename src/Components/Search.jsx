import React, { useState } from "react";
import searchIcon from '../Assets/Icons/magnifying-glass.png'

const Search = props => {
  const [text, setText] = useState("");
  return (
    <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
      <div className="row" style={{ marginLeft: 10, marginTop: 10 }}>
        <div className="col-12">
          <div class="input-group mb-5">
            <input
              type="text"
              className="form-control"
              placeholder="Search pet here.."
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
              <select class="form-control" id="exampleFormControlSelect1">
                <option value={false} hidden>Choose your favorite pet</option>
                {props.typeAnimals.length
                  ? props.typeAnimals.map(type => <option>{type.name}</option>)
                  : null}
              </select>
            </div>
          </div>
          <div className="mb-3">
            <div class="form-group">
              <label for="exampleFormControlSelect1">Breed</label>
              <select class="form-control" id="exampleFormControlSelect1">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
          </div>
          <div className="mb-3">
            <div class="form-group">
              <label for="exampleFormControlSelect1">Age</label>
              <select class="form-control" id="exampleFormControlSelect1">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
          </div>
          <div className="mb-3">
            <div class="form-group">
              <label for="exampleFormControlSelect1">Size</label>
              <select class="form-control" id="exampleFormControlSelect1">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <div class="form-group">
              <label for="exampleFormControlSelect1">Gender</label>
              <select class="form-control" id="exampleFormControlSelect1">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
          </div>
          <div
            className="mb-3 text-right"
            style={{ justifyContent: "space-evenly", display: "flex" }}
          >
            <button className="btn btn-danger" style={{ width: 110 }}>
              Clear
            </button>
            <button
              className="btn"
              style={{ backgroundColor: "#3C9D9B", color: "white", width: 110 }}
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
