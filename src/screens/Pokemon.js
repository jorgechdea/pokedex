import React, { useState, useEffect } from 'react';
import { ScrollView, Text } from 'react-native';
import { getPokemonDetailsApi } from '../api/pokemon';
import Icon from "react-native-vector-icons/FontAwesome5";
// Detail components
import Header from '../components/details/Header';
import Type from '../components/details/Type';
import Stats from '../components/details/Stats';
import Favorite from '../components/details/Favorite';


export default function Pokemon(props) {
    const {
        navigation,
        route: { params },
    } = props;

    const [pokemonDetail, setPokemonDetail] = useState(null);
    //console.log('details.....', pokemonDetail);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <Favorite id={pokemonDetail?.id} />,
            headerLeft: () => (
                <Icon
                    name="arrow-left"
                    color="#fff"
                    size={20}
                    style={{ marginLeft: 20 }}
                    onPress={navigation.goBack}
                />
            ),
        });
    }, [navigation, params, pokemonDetail]);


    useEffect(() => {
        (async () => {
            try {
                const response = await getPokemonDetailsApi(params.id);
                setPokemonDetail(response)
            } catch (error) {
                navigation.goBack()
            }
        })()
    }, [params])

    if (!pokemonDetail) return null;

    return (
        <ScrollView>
            <Header name={pokemonDetail.name}
                order={pokemonDetail.order}
                type={pokemonDetail.types[0].type.name}
                image={pokemonDetail.sprites.other["official-artwork"].front_default}
            />
            <Type types={pokemonDetail.types} />
            <Stats stats={pokemonDetail.stats} moves={pokemonDetail.moves} />
        </ScrollView>
    )
}