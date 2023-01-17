import React, { useState, useCallback } from 'react';
import { Text, SafeAreaView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getPokemonsFavoriteApi } from '../api/favorite';
import { getPokemonDetailsApi } from '../api/pokemon';
import PokemonList from '../components/PokemonList';

export default function Favorites() {
    const [pokemons, setPokemons] = useState([])

    //console.log(pokemons)

    useFocusEffect(
        useCallback(() => {
            (async () => {
                const response = await getPokemonsFavoriteApi();
                const pokemonsArray = [];

                for await (const id of response) {
                    const pokemonDetails = await getPokemonDetailsApi(id);
                    const lastmove = pokemonDetails.moves.pop()

                    pokemonsArray.push({
                        id: pokemonDetails.id,
                        name: pokemonDetails.name,
                        type: pokemonDetails.types[0].type.name,
                        order: pokemonDetails.order,
                        image: pokemonDetails.sprites.other["official-artwork"].front_default,
                        move: lastmove.move.name
                    })
                }

                setPokemons(pokemonsArray)

            })();
        }, [pokemons])
    )



    return (
        <PokemonList pokemons={pokemons} />
    )
}