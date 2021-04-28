import React from 'react';
import { Text, View, StatusBar, TouchableOpacity, StyleSheet, ScrollView, TextInput, Image, CheckBox } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { FontAwesome, Feather} from 'react-native-vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AuthContext from '../components/context';
import Users from '../models/Users';
import { Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

const RegisterScreen = ({ navigation }) => {
    const { sendPushNotification } = React.useContext(AuthContext);
    const [data, setData] = React.useState({
        username: '',
        password: '',
        fullname: '',
        email: '',
        confirm_password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
        isValidConfirmPassword: true,
        isPasswordMatch: true,
        check_textInputFullnameChange: false,
        isValidFullname: true,
        check_textInputEmailChange: false,
        isValidEmail: true,
        isValidSignUp: true,
        image: null,
        isCheckBox: false
    });

    const textInputChange = (val) => {
        if( val.length >= 4 ) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if(val.length >= 8){
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else{
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const handleConfirmPasswordChange = (val) => {
        if(val.length >= 8){
            setData({
                ...data,
                confirm_password: val,
                isValidConfirmPassword: true
            });
        } else{
            setData({
                ...data,
                confirm_password: val,
                isValidConfirmPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    }

    const { signUp } = React.useContext(AuthContext);

    const RegisterHandle = () => {
        if(data.isValidUser && data.isValidFullname && data.isValidEmail && data.isValidPassword && data.isValidConfirmPassword && data.username.length > 3 && data.fullname.length > 0 && data.password.length > 7 && data.confirm_password.length > 7 && data.email.length > 0 && data.isCheckBox){
            signUp(data.username, data.password, data.fullname, data.email, data.image);
            sendPushNotification("Registration Status", "Successfully registered & logged in");
        }else{
            setData({
                ...data,
                username: '',
                password: '',
                fullname: '',
                email: '',
                confirm_password: '',
                check_textInputChange: false,
                secureTextEntry: true,
                confirm_secureTextEntry: true,
                isValidUser: true,
                isValidPassword: true,
                isValidConfirmPassword: true,
                isPasswordMatch: true,
                check_textInputFullnameChange: false,
                isValidFullname: true,
                check_textInputEmailChange: false,
                isValidEmail: true,
                isValidSignUp: false,
                image: null,
                isCheckBox: false
            })
        }
    }

    const handleValidConfirmPassword = (val) => {
        if(data.password != data.confirm_password){
            setData({
                ...data,
                isPasswordMatch: false
            });
        } else{
            setData({
                ...data,
                isPasswordMatch: true
            });
        }
    }

    const textInputFullnameChange = (val) => {
        if( val.length >= 1 ) {
            setData({
                ...data,
                fullname: val,
                check_textInputFullnameChange: true,
                isValidFullname: true
            });
        } else {
            setData({
                ...data,
                fullname: val,
                check_textInputFullnameChange: false,
                isValidFullname: false
            });
        }
    }

    const textInputEmailChange = (val) =>{
        if( val.length >= 1 ) {
            setData({
                ...data,
                email: val,
                check_textInputEmailChange: true,
                isValidEmail: true
            });
        } else {
            setData({
                ...data,
                email: val,
                check_textInputEmailChange: false,
                isValidEmail: false
            });
        }
    }

    const choosePhotoFromLibrary = async() => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
      
          if (!result.cancelled) {
            setData({
                ...data,
                image: result
            });
          }
    }

    const deletePhoto = () => {
        setData({
            ...data,
            image: null
        })
    }

    const handleCheckBox = () => {
        setData({
            ...data,
            isCheckBox: !data.isCheckBox
        })
    }
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={[styles.text_header, {fontSize: 16, marginBottom: 5, color: 'rgba(255, 255, 255, 0.7)'}]}>Welcome!</Text>
            <Text style={styles.text_header}>Sign Up!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
            <ScrollView>
            <View style={styles.imageBoxContainer}>
                { data.image ? 
                    <View style={styles.imageBox}>
                        <Image 
                            source={{ uri: data.image.uri }}
                            style={{ width: 200, height: 150, borderRadius: 20 }}
                        />
                        <TouchableOpacity 
                            style={styles.deletePhoto}
                            onPress={deletePhoto}
                        >
                            <Feather
                                name="x-circle"
                                color='#05375a'
                                size={20}
                            />
                        </TouchableOpacity>
                    </View>
                    :
                    <TouchableOpacity 
                        style={styles.imageBox}
                        onPress={choosePhotoFromLibrary}
                    >
                        <Feather
                            name="upload-cloud"
                            color='#05375a'
                            size={50}
                        />
                        <Text style={styles.imageText}>Upload an image</Text>
                    </TouchableOpacity>
                } 
                {   data.image ? 
                    <TouchableOpacity 
                    onPress={deletePhoto}
                    >
                    <Text style={styles.imageText}>Upload another image</Text>
                    </TouchableOpacity>
                    :
                    null
                } 
            </View>
            <Text style={styles.text_footer}>Username</Text>
            <View style={styles.action}>
                {/* <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                /> */}
                <TextInput 
                    placeholder="Your Username"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                />
                {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            { !data.isValidUser ? 
                <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>
                            Username must be of 4 characters long
                    </Text>
                </Animatable.View>
                :
                null
            }
            

            <Text style={[styles.text_footer, {marginTop: 35}]}>Fullname</Text>
            <View style={styles.action}>
                {/* <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                /> */}
                <TextInput 
                    placeholder="Your Fullname"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputFullnameChange(val)}
                />
                {data.check_textInputFullnameChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            { !data.isValidFullname ? 
                <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>
                            Name cannot be blank
                    </Text>
                </Animatable.View>
                :
                null
            }

            <Text style={[styles.text_footer, {marginTop: 35}]}>Email</Text>
            <View style={styles.action}>
                {/* <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                /> */}
                <TextInput 
                    placeholder="Your Fullname"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputEmailChange(val)}
                />
                {data.check_textInputEmailChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            { !data.isValidEmail ? 
                <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>
                            Email cannot be blank
                    </Text>
                </Animatable.View>
                :
                null
            }

            
            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Password</Text>
            <View style={styles.action}>
                {/* <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                /> */}
                <TextInput 
                    placeholder="Your Password"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            { !data.isValidPassword ? 
            <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>
                        Password must be of 8 digits long
                </Text>
            </Animatable.View>   
            :
            null
            }
            

            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Confirm Password</Text>
            <View style={styles.action}>
                {/* <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                /> */}
                <TextInput 
                    placeholder="Confirm Your Password"
                    secureTextEntry={data.confirm_secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handleConfirmPasswordChange(val)}
                    onEndEditing={(e)=>handleValidConfirmPassword(e.nativeEvent.text)}
                />
                <TouchableOpacity
                    onPress={updateConfirmSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            { !data.isValidConfirmPassword ? 
            <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>
                        Password must be of 8 digits long
                </Text>
            </Animatable.View>   
            :
            null
            }
            { !data.isPasswordMatch ? 
            <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>
                        Both passwords doesn't matches
                </Text>
            </Animatable.View>   
            :
            null
            }
           

            
            <View style={styles.textPrivate}>
                <CheckBox
                    style={styles.checkBox}
                    value={data.isCheckBox}
                    onValueChange={handleCheckBox}
                />
                <Text style={styles.color_textPrivate}>
                    By signing up you agree to our
                </Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Terms of service</Text>
                <Text style={styles.color_textPrivate}>{" "}and</Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Privacy policy</Text>
            </View>
            { !data.isValidSignUp ? 
            <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>
                        Please fill all the details
                </Text>
            </Animatable.View>   
            :
            null
            }
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {RegisterHandle()}}
                >
                    <LinearGradient
                        colors={['#08d4c4', '#01ab9d']}
                        style={styles.signIn}
                    >
                        <Text style={[styles.textSign, {
                            color:'#fff'
                        }]}>Sign Up</Text>
                    </LinearGradient>
                </TouchableOpacity>

            </View>
            <View style={styles.signUpBox}>
                    <Text style={styles.signUpHeading}>Already have an account |</Text>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()} 
                    >
                            <Text style={styles.signUp}>Sign In</Text>
                    </TouchableOpacity>
            </View>
            </ScrollView>
        </Animatable.View>
        </View>
    )
}

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 4,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 40,
        paddingHorizontal: 40
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 14,
        fontFamily: "Roboto"
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 2
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        color: '#05375a',
        fontSize: 16,
        fontFamily: "Roboto"
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 10
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20,
    },
    color_textPrivate: {
        color: 'grey',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    signUpBox: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 2,
    },
    signUpHeading: {
        textAlign: 'center',
        color: '#05375a',
    },
    signUp: {
        textAlign: 'center',
        paddingHorizontal: 2,
        color: '#009387',
        fontWeight: 'bold'
    },
    imageBoxContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5
    },
    imageBox: {
        borderWidth: 2,
        borderColor: '#05375a',
        borderRadius: 20,
        width: 200,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    imageText: {
        color: '#009387',
        marginTop: 5,
        fontWeight: 'bold',
    },
    deletePhoto: {
        position: 'absolute',
        top: 10,
        right: 10
    },
    checkBox: {
        alignSelf: 'center',
    }
  });