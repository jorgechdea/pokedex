import React, { useState, useEffect, useCallback } from 'react'
import { Text, View, StyleSheet, Image, Button, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { SafeAreaView, } from 'react-native-safe-area-context';
import { useFormik } from 'formik';
import * as ImagePicker from 'expo-image-picker';
import { useFocusEffect } from '@react-navigation/native'
import { getPokemonsFavoriteApi } from '../api/favorite'


export default function Account() {

    const [name, setName] = useState("")
    const [birthday, setBirthday] = useState("")
    const [avatar, setAvatar] = useState('')

    const [hasCameraPermission, setHasCameraPermission] = useState(null)
    const [image, setImage] = useState(null)
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [total, setTotal] = useState(10)

    const formik = useFormik({
        initialValues: {
            name: "",
            birthday: "",
            avatar: ""
        },
        onSubmit: async (formValue) => {
            setName(formValue.name);
            setBirthday(formValue.birthday)
            console.log('datos enviados...', formik)

        }
    })

    useFocusEffect(
        useCallback(() => {
            (async () => {
                try {
                    const response = await getPokemonsFavoriteApi();
                    setTotal(response.length);
                    console.log('este es length....', response.length)
                } catch (error) {
                    setTotal(0);
                    console.log('aqui esta el error', error)
                }
            })();
        }, [])
    );



    function resetInfo() {
        formik.setFieldValue("birthday", '')
        formik.setFieldValue("name", '')
        formik.setFieldValue("avatar", '')
        console.log('esto es...', formik.values.birthday)
    }


    const openCamera = async () => {
        // Ask the user for the permission to access the camera
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your camera!");
            return;
        }

        const result = await ImagePicker.launchCameraAsync();

        // Explore the result
        console.log(result);

        if (!result.cancelled) {
            formik.setFieldValue("avatar", result.uri)
            console.log(result.uri);
        }
    }


    return (

        <ScrollView>

            <View style={styles.content}>
                {/* <View style={styles.titleBlock}>
                    <Text style={styles.title}>Welcome</Text>
                    <Text style={styles.title}>{`...`}</Text>
                </View> */}

                <View style={styles.avatar} >
                    <TouchableOpacity onPress={openCamera}>
                        {formik.values.avatar ? null :
                            <Text style={{ marginBottom: 5 }}>Touch pokeball to add your avatar</Text>}
                        <Image
                            source={formik.values.avatar ? { uri: formik.values.avatar } : require("../assets/pokeball.png")}
                            style={{ width: 200, height: 200 }}

                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.dataContent}>
                    <Text style={styles.itemMenuTitle}>Name:</Text>
                    <TextInput style={styles.input}
                        value={formik.values.name}
                        onChangeText={(text) => formik.setFieldValue("name", text)}
                    />
                </View>

                <View style={styles.dataContent}>
                    <Text style={styles.itemMenuTitle}>Birthday:</Text>
                    <TextInput
                        style={styles.input}
                        value={formik.values.birthday}
                        onChangeText={(text) => formik.setFieldValue("birthday", text)}
                    />
                </View>
                <View style={styles.dataContent}>
                    <Text style={styles.menuTitle}>Pokemons favoritos:</Text>
                    <Text style={styles.menuTitle}>{total}</Text>
                </View>

            </View>
            <View style={styles.btns}>
                <Button style={styles.button}
                    onPress={formik.handleSubmit}
                    title="Save info"
                />
                <Button style={styles.button}
                    onPress={resetInfo}
                    title="Reset info"
                />
            </View>
        </ScrollView>
    )
}

function ItemMenu(props) {
    const { title, text } = props;

    return (
        <View style={styles.itemMenu}>
            <Text style={styles.itemMenuTitle}>{title}:</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        marginHorizontal: 20,
        marginTop: 10,
    },
    titleBlock: {
        marginBottom: 30,
    },
    title: {
        fontWeight: "bold",
        fontSize: 22,
    },
    avatar: {
        alignItems: 'center',
        marginHorizontal: 'auto',
        marginVertical: 10,
    },
    dataContent: {
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: "row",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: "#CFCFCF",
    },
    itemMenu: {
        flexDirection: "row",

    },
    itemMenuTitle: {
        paddingTop: 12,
        fontWeight: "bold",
        width: 100,
        marginLeft: 10,
    },
    button: {
        margin: 15,

    },
    input: {
        height: 40,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        width: 220,
    },
    btns: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-around',

    },
    menuTitle: {
        paddingTop: 12,
        fontWeight: "bold",
        fontSize: 20,
        marginLeft: 10,
    },
});