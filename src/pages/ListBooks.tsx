import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, ScrollView, ActivityIndicator, Platform } from 'react-native';

import api from '../services/api'

interface iBook{
    id: number
    title: string,
    author: string,
    serie: string
  }
export default function ListBooks(){
    const [books, setBooks] = useState<Array<iBook>>([])
    const [state,setState] = useState<boolean>(true)
    async function getBooks(){
        await api.get('/books')
            .then(res=>{
                setState(false)
                setBooks(res.data)
            })
    }
    useEffect(()=>{
        getBooks()
    },[])
    if (state){
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator 
                    color="#008891" 
                    size={100}
                    animating={true}
                    
                />
                
                <Text>Carregando livros...</Text>
            </View>
        )
    } else {
        return (
            <ScrollView style={styles.container}>
                {
                    books.map((book,index)=>(
                        <View key={book.id} style={styles.bookField}>
                            <Text style={styles.bookId}>{index + 1}</Text>
                            <View>
                                <Text style={styles.bookName} ellipsizeMode='tail' numberOfLines={2}>{book.title}</Text>
                                <Text style={styles.bookAuthor} ellipsizeMode='tail' numberOfLines={1}>{book.serie}</Text>
                                <Text style={styles.bookAuthor}>{book.author}</Text>
                            </View>
                        </View>
                    ))
                }
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    loaderContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        color:'#fff',

    },
    container: {
        flex: 1,
        backgroundColor:'#181818',
    },
    bookField:{
        width:'80%',
        minHeight:80,
        height:'auto',
        alignSelf:'center',
        marginVertical: 5,
        backgroundColor:'#333',
        flexDirection:'row',
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    bookId:{
        fontSize:30,
        padding:10,
        fontFamily: (Platform.OS === 'ios') ? 'Courier New':'serif',
        color:'#9cf'
    },
    bookName:{
        fontSize:20,
        paddingVertical:5,
        paddingHorizontal:10,
        fontFamily: (Platform.OS === 'ios') ? 'Avenir-Book':'monospace',
        maxWidth:'97%',
        color:'#f4f4f4'

    },
    bookAuthor:{
        paddingHorizontal:10,
        fontFamily: (Platform.OS === 'ios') ? 'Courier New':'serif',
        maxWidth:'97%',
        color:'#f4f4f499'
    }
})