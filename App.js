import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  TextInput
} from "react-native";
import Task from "./components/Task";
import styles from "./App.components.style";
import Form from "./components/Form";

const App = () => {
  const [taskList, settaskList] = useState([]);
  const [list, setList] = useState([]);
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [id, setId] = useState(null);
  


  useEffect(() => {
    getListEmployees();
  }, []);
  const getListEmployees = () => {
    fetch("https://server-react-native-brrx.onrender.com/api/employees", {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res) setList(res.productDatas);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleAddTask = (task) => {
    // add Task
    settaskList([...taskList, task]);
  };
  const handleDeleteTask = (id) => {
    
    

    Alert.alert("Thông báo", "Bạn có chắc chắn muốn xóa", [
      {
        text: "Ok",
        onPress: () => {
          const url = "https://server-react-native-brrx.onrender.com/api/employees";
          fetch(`${url}/${id}` , {
            method: "DELETE",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              
            },
          })
            .then((res) => {
              return res.json();
            })
            .then((res) => {
              console.log(res);
      
              getListEmployees();
            })
            .catch((error) => {
              console.log(error);
            });
        },
      },
      { text: "cancel", onPress: () => {} },
    ]);
  };
  const handleCreate = () => {
    setModal(true)
  }
  const handleClose = () => {
    setModal(false)
  }
  const handleSave = () => {
   if(id === null) {
    fetch("https://server-react-native-brrx.onrender.com/api/employees", {
      method: "POST",
      body : JSON.stringify({
        "name" : name,
        "position" : position,
        "department" : department,
        "email" : email,
        "phone" : phone
        
      }),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
      
        getListEmployees();
        setModal(false)
        clearForm()
      })
      .catch((error) => {
        console.log(error);
      });
   }else {
    const url = "https://server-react-native-brrx.onrender.com/api/employees";
    fetch(`${url}/${id}`, {
      method: "PUT",
      body : JSON.stringify({
        "name" : name,
        "position" : position,
        "department" : department,
        "email" : email,
        "phone" : phone
        
      }),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
      
        getListEmployees();
        setModal(false)
        clearForm()
      })
      .catch((error) => {
        console.log(error);
      });
   }
  }
  const clearForm = () => {
    setName("")
    setEmail("")
    setDepartment("")
    setPosition("")
    setPhone("")
    setId(null)
  }
  const handleEdit =  (item) => {
    setName(item.name)
    setEmail(item.emaiil)
    setDepartment(item.department)
    setPosition(item.position)
    setPhone(item.phone)
    setId(item._id)
    setModal(true)
    alert(item._id)

  }
  return (
    <View style={styles.container}>
      <View style={styles.body}>
      <Modal visible={modal}>
      <View style={styles.container} >
      <View style={styles.body}>
        <View style={css.rowBetween}>
          <Text style={styles.header}>
            Create Employees
          </Text>
          <TouchableOpacity onPress={handleClose} style={styles.header}>
          <Text style={css.center} >Close</Text>
        </TouchableOpacity>
        </View>
          <Text>Họ và tên</Text>
          <TextInput value={name} onChangeText={(text) => {
            setName(text)
          }} style={css.TextInput} />
          <Text>Vị trí</Text>
          <TextInput  value={position} onChangeText={(text) => {
            setPosition(text)
          }} style={css.TextInput} />
          <Text>Phòng ban</Text>
          <TextInput value={department} onChangeText={(text) => {
            setDepartment(text)
          }} style={css.TextInput} />
          <Text>Email</Text>
          <TextInput value={email} onChangeText={(text) => {
            setEmail(text)
          }} style={css.TextInput} />
          <Text>Số điện thoại</Text>
          <TextInput  value={phone} onChangeText={(text) => {
            setPhone(text)
          }} style={css.TextInput} />
          <TouchableOpacity onPress={handleSave} style={styles.header}>
              <Text  style={css.center}>Save</Text>
          </TouchableOpacity>
          </View>

          </View>
        </Modal>
        <View style={css.rowBetween}>
        <Text style={styles.header}>Todo List</Text>
        <TouchableOpacity onPress={handleCreate} style={styles.header}>
          <Text  style={css.center}>Create</Text>
        </TouchableOpacity>
        </View>
       
        
        <ScrollView style={styles.items}>
          {list.map((item) => {
            return (
              <View style={css.rowBetween}>
                <View key={item._id}>
                  <Text>{item.name}</Text>
                </View>
                <View style={css.center}>
                <TouchableOpacity onPress={() => handleDeleteTask(item._id)}>
                  <Text style={css.delete}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleEdit(item)}>
                  <Text style={css.edit}>Edit</Text>
                </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
     
    </View>
  );
};
export default App;
const css = StyleSheet.create({
  edit : {
    color : "blue"
  },
  center : {
    display : "flex",
    gap : 10,
    flexDirection : "row",
    justifyContent : "center",
    alignItems : "center",
    alignContent : "center",
    
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical : 10
  },
  delete: {
    color: "red",
  },
  TextInput : {
    height: 44,
    width: "100%",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#21a3d0",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    padding : 10,
    borderWidth : 1,
    borderColor : "#888",
    marginTop : 10
  }
});
