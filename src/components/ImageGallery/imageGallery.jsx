import { Component, useState, useEffect } from "react";

import { getAllPosts } from "../../api/posts";

import styles from "./posts.module.css";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(()=> {        
        const fetchPosts = async ()=> {
            try {
                setLoading(true);
                const {data} = await getAllPosts();
                setPosts(data?.length ? data : []);
            }
            catch(error) {
                setError(error.message);
            }
            finally {
                setLoading(false);
            }
        }

        fetchPosts();
    }, []);

    const elements = posts.map(({ id, title, body }) => (<li key={id} className={styles.item}>
        <h3>{title}</h3>
        <p>{body}</p>
    </li>));

    return (
        <>
            {error && <p className={styles.error}>{error}</p>}
            {loading && <p>...Loading</p>}
            {Boolean(elements.length) && (<ul className={styles.list}>
                {elements}
            </ul>)}
        </>
    )
}

export default Posts;