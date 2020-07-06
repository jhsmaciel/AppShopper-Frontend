import React, { useState } from 'react';
import { View, StatusBar } from 'react-native';
import { LoginSvg } from '../../assets/svg';
import { Button } from '../../component/button';
import { Text } from '../../component/text';
import { Input, InputPassword } from '../../component/Input';
import { useAuthentication } from '../../context/LoginContext';
import { showMessage, hideMessage } from 'react-native-flash-message';

const Login: React.FC = () => {
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
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#FFF',
                }} 
            >
                <View
                    style={{
                        height: '20%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text
                        size="big"
                        type="semibold"
                    > App Shopper</Text>
                </View>
                <View
                    style={{
                        height: '30%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <LoginSvg width={150}/>
                </View>
                <View 
                    style={{
                        height: '50%',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        width: '80%'
                    }}
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
                </View>
            </View>
        </>
    );
}

export default Login
