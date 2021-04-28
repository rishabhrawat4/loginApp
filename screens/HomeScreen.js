import React, { useRef } from 'react';
import { Text, View, StyleSheet, Button, StatusBar, TouchableOpacity, Image, Dimensions, TextInput} from 'react-native';
import AuthContext from '../components/context';
import * as Animatable from 'react-native-animatable';
import { useTheme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome, Feather} from 'react-native-vector-icons';

const window = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
    const { signOut } = React.useContext(AuthContext);
    const { getUsername, changeFullname, changeUsername, changeEmail, sendPushNotification } = React.useContext(AuthContext);
    const item = getUsername();
    const { colors } = useTheme();

    const fullnameRef = useRef(null);
    const UsernameRef = useRef(null);
    const emailRef = useRef(null);

    const [data, setData] = React.useState({
        username: item.username,
        fullname: item.fullname,
        email: item.email,
        isUsernameChange: false,
        isFullnameChange: false,
        isEmailChange: false
    })

    const updateFullnameChanged = () => {
        setData({
            ...data,
            isFullnameChange: !data.isFullnameChange
        })
        //fullnameRef.current.focus()
    }

    const updateUsernameChanged = () => {
        setData({
            ...data,
            isUsernameChange: !data.isUsernameChange
        })
    }

    const updateEmailChanged = () => {
        setData({
            ...data,
            isEmailChange: !data.isEmailChange
        })
    }

    const handleFullnameTextInput = (val) => {
        setData({
            ...data,
            fullname: val
        })
    }

    const handleUsernameTextInput = (val) => {
        setData({
            ...data,
            username: val
        })
    }

    const handleEmailTextInput = (val) => {
        setData({
            ...data,
            email: val
        })
    }

    const updateFullname = () => {
        const user = changeFullname(data.fullname);
        updateFullnameChanged();
    }

    const updateUsername = () => {
        const user = changeUsername(data.username);
        updateUsernameChanged();
    }

    const updateEmail = () => {
        const user = changeEmail(data.email);
        updateEmailChanged();
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
            <StatusBar backgroundColor="#009387" barStyle="light-content" />
            {item.image ? 
                <Image 
                style={styles.tinyPhoto}
                source={{ uri: item.image.uri }} />
                :
                null
            }
            
            <View style={styles.header}>
                <Text style={styles.text_header}>Hi {item.fullname} </Text>
            </View>
            </View>
            
            <Animatable.View 
                animation="fadeInUpBig"
                duration={500}
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
            >
                
                <View style={styles.action}>
                    <Text style={styles.text_footer}>Fullname: </Text>
                    { data.isFullnameChange ?
                        <TextInput 
                            placeholder="Enter Fullame"
                            placeholderTextColor="#666666"
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            value={data.fullname}
                            autoCapitalize="none"
                            onChangeText={(val) => handleFullnameTextInput(val)}
                            autoFocus={true}
                            ref={fullnameRef}
                        />
                        :
                        <Text style={styles.text_footer}>{item.fullname}</Text>
                    }
                    { data.isFullnameChange ?
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity onPress={() => updateFullname()} style={{ marginRight: 5}}>
                                <Feather 
                                    name="check"
                                    color="green"
                                    size={20}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => updateFullnameChanged()}>
                                <Feather 
                                    name="x-circle"
                                    color="green"
                                    size={20}
                                />
                            </TouchableOpacity>
                        </View>
                        :
                        <TouchableOpacity onPress={() => updateFullnameChanged()} style={{ marginLeft: 'auto'}}>
                            <Feather 
                                name="edit-3"
                                color="green"
                                size={20}
                            />
                        </TouchableOpacity>
                    }
                </View> 

                <View style={styles.action}>
                    <Text style={styles.text_footer}>Username: </Text>
                    { data.isUsernameChange ? 
                        <TextInput 
                            placeholder="Enter Username"
                            placeholderTextColor="#666666"
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            value={data.username}
                            autoCapitalize="none"
                            onChangeText={(val) => handleUsernameTextInput(val)}
                        />
                        :
                        <Text style={styles.text_footer}>{item.username}</Text>
                    }
                    { data.isUsernameChange ? 
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity onPress={() => updateUsername()} style={{ marginRight: 5}}>
                                <Feather 
                                    name="check"
                                    color="green"
                                    size={20}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => updateUsernameChanged()}>
                                <Feather 
                                    name="x-circle"
                                    color="green"
                                    size={20}
                                />
                            </TouchableOpacity>
                        </View>
                        :
                        <TouchableOpacity onPress={() => updateUsernameChanged()} style={{ marginLeft: 'auto'}}>
                            <Feather 
                                name="edit-3"
                                color="green"
                                size={20}
                            />
                        </TouchableOpacity>
                    }
                </View>

                <View style={styles.action}>
                    <Text style={styles.text_footer}>Email: </Text>
                    { data.isEmailChange ? 
                        <TextInput  
                            placeholder="Enter Email"
                            placeholderTextColor="#666666"
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            value={data.email}
                            autoCapitalize="none"
                            onChangeText={(val) => handleEmailTextInput(val)}
                        />
                        :
                        <Text style={styles.text_footer}>{item.email}</Text>
                    }
                    { data.isEmailChange ? 
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity onPress={() => updateEmail()} style={{ marginRight: 5}}>
                            <Feather 
                                name="check"
                                color="green"
                                size={20}
                            />
                            </TouchableOpacity>
                        <TouchableOpacity onPress={() => updateEmailChanged()}>
                            <Feather 
                                name="x-circle"
                                color="green"
                                size={20}
                            />
                        </TouchableOpacity>
                        </View>
                        :
                        <TouchableOpacity onPress={() => updateEmailChanged()} style={{ marginLeft: 'auto'}}>
                            <Feather 
                                name="edit-3"
                                color="green"
                                size={20}
                            />
                        </TouchableOpacity>
                    }
                    
                </View>


                <TouchableOpacity
                    style={[styles.signIn, {marginTop: 35}]}
                    onPress={() => {signOut()}}
                    >
                        <LinearGradient
                            colors={['#08d4c4', '#01ab9d']}
                            style={[styles.signIn, {
                                marginTop: 10
                            }]}
                        >
                            <Text style={[styles.textSign, {
                                color:'#fff'
                            }]}>Sign Out</Text>
                        </LinearGradient>
                </TouchableOpacity>
            </Animatable.View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#009387'
    },
    headerContainer: {
        height: window.height*0.3
    },
    header: {
        position: 'absolute',
        left: 10,
        bottom: 5,
        
    },
    footer: {
        flex: 3,
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
        fontSize: 20,
        marginRight: 10
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
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
        marginTop: -12,
        paddingLeft: 10,
        color: '#05375a',
        fontSize: 20
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
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
    tinyPhoto: {
        width: window.width,
        height: window.height*0.4
    }
  });

export default HomeScreen;