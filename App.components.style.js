import {StyleSheet} from 'react-native'
import color from './contains/color';
color
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.background,
        alignContent: 'center',
        justifyContent: 'center'
      },
      body: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 18
      },
      header: {
        display : "flex",
        justifyContent : "center",
        alignItems : "center",
        alignContent : "center",
        fontSize: 24,
        color: color.primary,
        fontWeight: 'bold'
      },
      items: {
        marginTop:20
      },
})
export default styles;