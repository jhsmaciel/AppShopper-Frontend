import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/Ionicons';
import IconMI from 'react-native-vector-icons/MaterialIcons';

import { useAuthentication } from '../../context/LoginContext';
import { Header } from '../../component/header';
import { colors } from '../../config';
import { Input } from '../../component/Input';
import { getRepositories, Repository, getRepoByName } from '../../service/repositories';
import { Text } from '../../component/text';
import { Favorite, postFavorite, deleteFavorite } from '../../service/favorite';
import { useFavorites } from '../../context/FavoritesContext';
import { styles } from '../styles';

const Dashboard = ({ navigation }: { navigation: any }) => {
    const { user, signOut } = useAuthentication();
    const [search, setSearch] = useState<string>('');
    const [repositories, setRepositories] = useState<Repository[]>([]);
    const { favorites, setFavorites } = useFavorites();

    useEffect(() => {
        async function loadRepositories() {
            try {
                const responseRepositories = await getRepositories()
                setRepositories(responseRepositories)
            } catch (error) {
                showMessage({
                    message: "Não foi possível buscar a lista de repositórios...",
                    type: "danger"
                })
            }
        }
        loadRepositories()
    }, []);

    async function _handlePostFavorite(item: Repository) {
        try {
            const favoriteResponse = await postFavorite(user.id, {
                avatar_url: item.owner.avatar_url,
                description: item.description,
                full_name: item.full_name,
                login: item.owner.login,
                name: item.name,
            });
            setFavorites([...(favorites || []), favoriteResponse])
        } catch (error) {
            console.log(error)
            showMessage({
                message: "Não foi possível favoritar o item!",
                type: "danger"
            })
        }
    }

    async function _handleDeleteFavorite(favorite: Favorite) {
        try {
            await deleteFavorite(user.id, favorite.id);
            setFavorites(favorites?.filter(favo => favo.full_name !== favorite.full_name))
        } catch (error) {
            showMessage({
                message: "Não foi possível desfavoritar o item!",
                type: "danger",
            })
        }
    }

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
                message: "Não foi encontrado nenhum repositório com esse nome!\nEx: angular/angular",
                type: 'danger'
            })
        }
    }

    return (
        <>
            <Header label="Listagem de repositórios" onPressBack={signOut} onPressRightIcon={() => navigation.navigate("Settings")} />
            <View
                style={styles.background}
            >
                <View 
                    style={styles.content} 
                >
                    <View 
                        style={styles.inputSearch}
                    >
                        <Input 
                            onChange={setSearch} 
                            value={search} 
                            placeholder="Digite o nome do repositório"
                        />
                        <TouchableOpacity onPress={_handleSearch} style={styles.iconSearch}>
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
                        keyExtractor={(item) => item.full_name }
                        renderItem={({ item }) => {
                            const isFavorite = favorites?.find(favorite => favorite.full_name === item.full_name)
                            return (
                                <View
                                    style={styles.viewMainRepo}
                                >
                                    <View 
                                        style={styles.viewRepo}
                                    >
                                        <Text>{item.full_name}</Text>
                                        <IconMI 
                                            name={isFavorite ? "favorite" : "favorite-border"} 
                                            size={20} 
                                            color={isFavorite ? colors.primary : colors.dark}
                                            onPress={() => isFavorite ? _handleDeleteFavorite(isFavorite) : _handlePostFavorite(item)}
                                        />
                                    </View>
                                    <View
                                        style={styles.viewRepo}
                                    >
                                        <Text size="small" color={colors.dark}>{item.description}</Text>
                                    </View>
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
