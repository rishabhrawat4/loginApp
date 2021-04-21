import React from 'react';
import { Text, View, StatusBar, TouchableOpacity, StyleSheet, ScrollView, TextInput, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { FontAwesome, Feather} from 'react-native-vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AuthContext from '../components/context';
import Users from '../models/Users';
import { Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

const RegisterScreen = ({ navigation }) => {
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
        image: null
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

    const RegisterHandle = (username, password, fullname, email, image) => {
        if(data.isValidUser && data.isValidFullname && data.isValidEmail && data.isValidPassword && data.isValidConfirmPassword && data.username.length > 3 && data.fullname.length > 0 && data.password.length > 7 && data.confirm_password.length > 7 && data.email.length > 0){
            signUp(username, password, fullname, email, data.image);
        }else{
            setData({
                ...data,
                isValidSignUp: false
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
          console.log(data.image);
    }
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Register Now!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
            <ScrollView>
            <Text style={styles.text_footer}>Username</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
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
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
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
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
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
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
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
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
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
            <TouchableOpacity
                    style={styles.signIn}
                    onPress={choosePhotoFromLibrary}
                >
                <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Upload Image</Text>
                </LinearGradient>
            </TouchableOpacity>
            { data.image ? 
                <Image 
                    source={{ uri: data.image.uri }}
                    style={{ width: 300, height: 300 }}
                />
                :
                null
            }
            
            <View style={styles.textPrivate}>
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
                    onPress={() => {RegisterHandle(data.username, data.password, data.fullname, data.email, data.image)}}
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

                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={[styles.signIn, {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#009387'
                    }]}>Sign In</Text>
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
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
  });