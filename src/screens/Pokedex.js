import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import { getPokemonsApi, getPokemonDetailsByUrlApi } from '../api/pokemon'
import PokemonList from '../components/PokemonList';


export default function Pokedex() {
    const [pokemons, setPokemons] = useState([]);
    const [nextUrl, setNextUrl] = useState(null)

    useEffect(() => {
        (async () => {
            await loadPokemons();
        })();
    }, []);

    const loadPokemons = async () => {
        try {
            const response = await getPokemonsApi(nextUrl);
            setNextUrl(response.next)
            const pokemonsArray = [];


            for await (const pokemon of response.results) {
                const pokemonDetails = await getPokemonDetailsByUrlApi(pokemon.url);
                const lastmove = pokemonDetails.moves.pop()

                pokemonsArray.push({
                    id: pokemonDetails.id,
                    name: pokemonDetails.name,
                    type: pokemonDetails.types[0].type.name,
                    order: pokemonDetails.order,
                    image: pokemonDetails.sprites.other["official-artwork"].front_default,
                    move: lastmove.move.name
                });
            }

            setPokemons([...pokemons, ...pokemonsArray]);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <SafeAreaView>
            <PokemonList
                pokemons={pokemons}
                loadPokemons={loadPokemons}
                isNext={nextUrl}
            />
        </SafeAreaView>
    );
}