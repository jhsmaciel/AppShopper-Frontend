import React, { useState, useEffect } from 'react';
import { View, StatusBar, TouchableOpacity, FlatList } from 'react-native';
import { useAuthentication } from '../../context/LoginContext';
import { Header } from '../../component/header';
import { colors } from '../../config';
import { Input } from '../../component/Input';
import Icon from 'react-native-vector-icons/Ionicons';
import { getRepositories, Repository, getRepoByName } from '../../service/repositories';
import { showMessage } from 'react-native-flash-message';
import { Text } from '../../component/text';

const Dashboard: React.FC = () => {
    const { signOut } = useAuthentication();
    const [search, setSearch] = useState<string>('');
    const [repositories, setRepositories] = useState<Repository[]>([]);

    useEffect(() => {
        async function loadRepositories() {
            const repositoryes = await getRepositories()
            setRepositories(repositoryes)

        }
        loadRepositories()
    }, []);

    async function _handleSearch() {
        try {
            if(search){
                const repo = await getRepoByName(search);
                setRepositories([...repositories, repo])
            } else {
                showMessage({
                    message: "Digite um nome de repositório válido!",
                    type: 'danger',
                })
            }
        } catch (error) {
            showMessage({
                message: "Não foi encontrado nenhum repositório com esse nome!",
                type: 'danger'
            })
        }
    }

    return (
        <>
            <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
            <Header label="Listagem de repositórios" onPressBack={signOut} />
            <View
                style={{
                    backgroundColor: colors.primary,
                    flex: 1,
                }}
            >
                <View 
                    style={{
                        alignItems: 'center',
                        backgroundColor: colors.light,
                        flex: 1,
                        borderTopLeftRadius: 25,
                        borderTopRightRadius: 25,
                        paddingHorizontal: 15,
                        paddingTop: 15
                    }} 
                >
                    <View 
                        style={{
                            width: '90%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            alignSelf: 'flex-start'
                        }}
                    >
                        <Input onChange={setSearch} value={search} placeholder="Digite o nome do repositório"/>
                        <TouchableOpacity onPress={_handleSearch} style={{ paddingLeft: 10}}>
                            <Icon name="ios-search" size={25} />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        style={{
                            width: '100%'
                        }}
                        data={
                            repositories
                                .filter(repository => repository.full_name.toLowerCase().includes(search.toLowerCase()))
                        }
                        renderItem={({ item }) => {
                            return (
                                <View 
                                    style={{
                                        padding: 10
                                    }}
                                >
                                    <Text>{item.full_name}</Text>
                                </View>
                            );
                        }}
                        
                    />
                </View>
            </View>
        </>
    );
}

export default Dashboard
