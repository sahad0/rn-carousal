import { View, FlatList, Image, Text, Dimensions, StyleSheet, Animated } from 'react-native'
import React, { useRef } from 'react'



const data = [
  {
    id: 1,
    url: "https://getwallpapers.com/wallpaper/full/f/0/a/1276880-top-mobile-wallpaper-1080x1920-macbook.jpg"
  },
  {
    id: 2,
    url: "https://gmedia.playstation.com/is/image/SIEPDC/playstation-wallpapers-persona-5-royal-mobile-wallpaper-01-ps4-27mar20-en-us?$native$"
  },
  {
    id: 3,
    url: "https://files.oyebesmartest.com/uploads/large/11611041269njn.jpeg",
  }
]

const imageW = Dimensions.get("screen").width;
const imageH = Dimensions.get("screen").height;



const _items = ({ item }) => (

  <>
    <View key={item.id} style={{
      display: "flex", alignItems: "center", justifyContent: "center", width: imageW, shadowColor: "#000000",
      shadowOpacity: 0.8,
      shadowRadius: 2,
      shadowOffset: {
        height: 1,
        width: 1
      }
    }}>
      <Image source={{ uri: item.url, width: imageW * 0.8, height: imageH * 0.6 }} style={{ borderRadius: 20, }} resizeMode={"cover"} />
    </View>

  </>


)


const MapComponent = ({ scrollX }) => {


  return data.map((k, index) => {
    const inputRange = [(index - 1) * imageW, index * imageW, (index + 1) * imageW];
    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0, 1, 0]
    })
    return (
      <Animated.Image key={index} source={{ uri: k.url }} style={[StyleSheet.absoluteFillObject, { opacity }]} blurRadius={30} />
    )
  })

}







const App = () => {

  const scrollX = useRef(new Animated.Value(0)).current;



  return (
    <>


      <View style={{ display: "flex", flex: 1, backgroundColor: "white" }}>
        <View style={[StyleSheet.absoluteFillObject]}>
          <MapComponent scrollX={scrollX} />
        </View>
        <Animated.FlatList showsHorizontalScrollIndicator={false} data={data}
          renderItem={_items} horizontal pagingEnabled={true} bounces={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
        />
      </View>
    </>
  )
}

export default App