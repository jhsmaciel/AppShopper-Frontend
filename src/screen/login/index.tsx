import React, { useState } from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { LoginSvg } from '../../assets/svg';
import { Button } from '../../component/button';
import { Text } from '../../component/text';
import { Input, InputPassword } from '../../component/Input';
import { useAuthentication } from '../../context/LoginContext';
import { showMessage, hideMessage } from 'react-native-flash-message';
import { colors } from '../../config';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Login = ({ navigation }: { navigation: any }) => {
    const [login, setLogin] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const { signIn } = useAuthentication();

    async function _handleSubmit() {
        try {
            setLoading(true)
            await signIn({ password: senha, username: login });
        } catch (error) {
            showMessage({
                message: "Senha/E-mail inválido!",
                type: 'danger'
            })
            setLoading(false)
        }
    }
    return (
        <>
            <View 
                style={styles.content} 
            >
                <View
                    style={styles.header}
                >
                    <Text
                        size="big"
                        type="semibold"
                        color={colors.light}
                    > App Shopper</Text>
                </View>
                <View
                    style={styles.svg}
                >
                    <LoginSvg width={150}/>
                </View>
                <View 
                    style={styles.fields}
                >

                    <Input
                        placeholder="Login"
                        onChange={setLogin}
                        value={login}
                    />
                    <InputPassword
                        placeholder="Senha"
                        onChange={setSenha}
                        value={senha}
                    />
                    <Button
                        onPress={_handleSubmit}
                        disabled={loading}
                    >
                        Entrar
                    </Button>
                    <View
                        style={styles.viewText}
                    >
                        <Text color={colors.dark} style={{ marginRight: 5}}>Não tem conta?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('CreateUser')}>
                            <Text>Cadastrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    );
}

export default Login


const styles = StyleSheet.create({
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.light,
    },
    header: {
        height: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
        width: '100%',
        borderBottomEndRadius: 150,
    },
    svg: {
        height: '30%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fields: {
        height: '50%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '80%'
    },
    viewText: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
})