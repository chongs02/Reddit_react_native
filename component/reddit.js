import React, { Component, Fragment } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import axios from "axios";

// 1. API 불러오기
// 2. Reddit 게시물 정보 가져오기
// 3. 가져온 정보를 Display하기

export default class Reddit extends Component {
  state = {};

  getInfo = async () => {
    const reddit = await this.callApi();

    this.setState({ reddit });
  };

  //   callApi = () => {
  //     return fetch("https://www.reddit.com/.json?sort=new&limit=10")
  //       .then(response => response.json())
  //       .then(json => json.data.children)
  //       .catch(err => console.log(err));
  //   };

  callApi = () => {
    return axios
      .get("https://www.reddit.com/.json?sort=new&limit=10")
      .then(response => response.data.data.children)
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.getInfo();
  }

  renderInfo = () => {
    const contents = this.state.reddit.map(object => {
      return (
        <Fragment key={object.data.id}>
          <View>
            <Text style={styles.text}>{object.data.id}</Text>
          </View>
          <View style={{ borderWidth: 0.5, marginTop: 5, marginBottom: 5 }}>
            <Text style={styles.text}>{object.data.title}</Text>
          </View>
          <View>
            <Image
              source={{
                uri: object.data.thumbnail
              }}
              style={{
                width: object.data.thumbnail_width,
                height: object.data.thumbnail_height
              }}
            />
          </View>
        </Fragment>
      );
    });
    return contents;
  };

  render() {
    return (
      <ScrollView>
        {this.state.reddit ? (
          this.renderInfo()
        ) : (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text>rendering!</Text>
          </View>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    fontWeight: "bold"
  }
});
