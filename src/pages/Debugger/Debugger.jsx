import React from 'react';
import { useSelector } from 'react-redux';

function Debugger() {
    const books = useSelector((state) => state.loaderReducer.books);
    const mybooks = useSelector((state) => state.loaderReducer.mybooks);
    console.log(books);

    if (!books) return <div className="text-center my-5">Loading books...</div>;

    return (
        <div className="container my-4">
            <h3 className="mb-4">Data status: {books ? "Loaded" : "Loading..."}</h3>
            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
                {[...(mybooks || []), ...(books || [])].map((item) => (
                    <div className="col" key={item._id}>
                        <div className="card h-100">
                            <img src={item.thumbnailUrl} className="card-img-top" alt={item.title} />
                            <div className="card-body">
                                <h5 className="card-title">{item.title}</h5>
                                <p className="card-text"><strong>ISBN:</strong> {item.isbn}</p>
                                <p className="card-text"><strong>Status:</strong> {item.status}</p>
                                <p className="card-text"><strong>Published:</strong> {new Date(item.publishedDate?.$date).toLocaleDateString()}</p>
                                <p className="card-text"><strong>Categories:</strong></p>
                                <ul>
                                    {item.categories?.map((cat, i) => <li key={i}>{cat}</li>)}
                                </ul>
                                <p className="card-text"><strong>Authors:</strong></p>
                                <ul>
                                    {item.authors?.map((auth, i) => <li key={i}>{auth}</li>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Debugger;
