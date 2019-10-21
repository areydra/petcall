import React, { Component } from "react";
import Card from "../Components/Card";
import Header from "../Components/Header";
import Search from "../Components/Search";
import { Client } from "@petfinder/petfinder-js";
import BottomScrollListener from "react-bottom-scroll-listener";
import _ from "lodash";

const client = new Client({
  apiKey: "2Y9UArwgWV579LoxM4RRgos9UvKMvBM8O6BTD0U7hgrXDPHjSv",
  secret: "pufPGC5JTlUYOHuTOaflW5aUf4EjAUFQAcGthUor"
});

class Home extends Component {
  state = {
    animals: [],
    page: 1,
    onLoading: false,
    typeAnimals: [],
    err: ""
  };

  componentDidMount = async () => {
    this.props.match.params.name ? await this.getPetName() : await this.getPet();
    await this.getTypeAnimals()
    client.animalData
      .breeds()
      .then(res => {
        console.log('breed', res)
        // this.setState({ typeAnimals: res.data.types });
      })
      .catch(err => {
        console.log(err);
        this.setState({ err });
      });
  };

  getTypeAnimals = () => {
    client.animalData
      .types()
      .then(res => {
        this.setState({ typeAnimals: res.data.types });
      })
      .catch(err => {
        console.log(err);
        this.setState({ err });
      });
  }

  getPet = currentPage => {
    client.animal
      .search({ limit: 9, page: currentPage ? currentPage : this.state.page })
      .then(res => {
        let animals = [];
        currentPage
          ? (animals = [...this.state.animals, ...res.data.animals])
          : (animals = res.data.animals);
        this.setState({ animals, onLoading: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ err });
      });
  };

  getPetName = currentPage => {
    client.animal
      .search({ name: this.props.match.params.name, limit: 9, page: currentPage ? currentPage : this.state.page })
      .then(res => {
        let animals = [];
        currentPage
          ? (animals = [...this.state.animals, ...res.data.animals])
          : (animals = res.data.animals);
        this.setState({ animals, onLoading: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ err });
      });
  }

  handleSearch = text => {
    window.open(`/search/${text}`, "_blank");
  };

  morePages = () => {
    const nextPage = this.state.page + 1;
    this.setState({ onLoading: true, page: nextPage });
    this.props.match.params.name ? this.getPetName(nextPage) : this.getPet(nextPage);
  };

  render() {
    return (
      <BottomScrollListener onBottom={this.morePages}>
        <Header />
        <div
          className="row content container-fluid"
          style={{ margin: "0px !important" }}
        >
          <Search onHandleSearch={this.handleSearch} typeAnimals={this.state.typeAnimals} />
          <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            {this.props.match.params.name ? (
              <p style={{ marginTop: 8 }} className="text-center">
                Show result : {this.props.match.params.name}
              </p>
            ) : null}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                paddingBottom: 40
              }}
            >
              {!this.state.animals.length ? (
                <div
                  class="spinner-border text-primary"
                  role="status"
                  style={{ color: "#3C9D9B !important", marginTop: 20 }}
                >
                  <span class="sr-only">Loading...</span>
                </div>
              ) : (
                this.state.animals.map(animal => (
                  <Card
                    name={animal.name}
                    gender={animal.gender}
                    image={
                      animal.photos.length
                        ? animal.photos[0].large
                        : "http://saveabandonedbabies.org/wp-content/uploads/2015/08/default.png"
                    }
                    description={animal.description}
                  />
                ))
              )}
              {this.state.onLoading ? (
                <div style={{ width: "100%", textAlign: "center" }}>
                  <div
                    class="spinner-border text-primary"
                    role="status"
                    style={{ color: "#3C9D9B !important" }}
                  >
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </BottomScrollListener>
    );
  }
}

export default Home;

