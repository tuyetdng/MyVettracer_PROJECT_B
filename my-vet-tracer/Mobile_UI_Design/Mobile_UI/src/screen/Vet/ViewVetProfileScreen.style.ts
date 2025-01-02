import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  header: {
    padding: 20,
    alignItems: "center",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  goBack: {
    position: "absolute",
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
},
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  role: {
    fontSize: 16,
    color: "#fff",
  },
  location: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff",
    marginVertical: 10,
  },
  iconRow: {
    flexDirection: "row",
    marginTop: 10,
  },
  iconButton: {
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  aboutSection: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: "row",
  },
  statItem: {
    textAlign: "center",
    fontSize: 14,
    color: "#555",
    marginLeft: 70,
  },
  statValue: {
    fontWeight: "bold",
    fontSize: 18,
  },
  infoSection: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  infoItem: {
    fontSize: 14,
    marginBottom: 10,
    color: "#555",
  },
  editButton: {
    marginTop: 20,
    marginHorizontal: 40,
    padding: 10,
    backgroundColor: "#FF7E5F",
    borderRadius: 20,
    alignItems: "center",
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  socialRow: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  socialText: {
    fontSize: 14,
    color: "#555",
  },
  socialIcon: {
    marginHorizontal: 10,
    color: "#555",
  },
  input: {
    width: "50%",
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    marginEnd: 10,
  },
  inputLarge: {
    width: "100%",
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    marginEnd: 10,
  },
  aboutDescription: {
    fontSize: 16,
    color: "#444", 
    lineHeight: 22, 
    marginVertical: 8, 
    paddingHorizontal: 10, 
    textAlign: "justify", 
  },
});
export default styles;