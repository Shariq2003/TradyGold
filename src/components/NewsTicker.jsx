import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoMdClose } from "react-icons/io";

const NewsTicker = () => {
    const [news, setNews] = useState([]);
    const [visibleNews, setVisibleNews] = useState([]);
    const [loading, setLoading] = useState(true);

    const API_URL =
        "https://newsdata.io/api/1/latest?apikey=pub_745575c3821368af2b1d436cf9332d0aae025&qInTitle=Gold%20prices%20in%20india";

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(API_URL);
                const articles = response.data.results || [];
                setNews(articles);
                setVisibleNews(articles);
            } catch (error) {
                console.error("Failed to fetch news:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    const handleClose = (index) => {
        setVisibleNews((prev) => prev.filter((_, i) => i !== index));
    };

    if (loading) {
        return null;
    }

    const half = Math.ceil(visibleNews.length / 2);
    const firstRow = visibleNews.slice(0, half);
    const secondRow = visibleNews.slice(half);

    const renderNewsRow = (newsRow, animationClass) => (
        <div className={`w-full flex overflow-hidden relative`}>
            <div className={`flex min-w-full animate ${animationClass}`}>
                {newsRow.map((article, index) => (
                    <div
                        key={index}
                        className="flex items-center bg-gray-800 bg-opacity-80 px-4 py-2 rounded-lg min-w-max relative mx-2"
                    >
                        <a
                            href={article.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-yellow-400 hover:underline"
                        >
                            {article.title}
                        </a>
                        <button
                            onClick={() => handleClose(index)}
                            className="ml-4 text-gray-400 hover:text-red-500"
                        >
                            <IoMdClose size={18} />
                        </button>
                    </div>
                ))}
                {newsRow.map((article, index) => (
                    <div
                        key={`duplicate-${index}`}
                        className="flex items-center bg-gray-800 bg-opacity-80 px-4 py-2 rounded-lg min-w-max relative mx-2"
                    >
                        <a
                            href={article.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-yellow-400 hover:underline"
                        >
                            {article.title}
                        </a>
                        <button
                            onClick={() => handleClose(index)}
                            className="ml-4 text-gray-400 hover:text-red-500"
                        >
                            <IoMdClose size={18} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="fixed top-20 w-full overflow-hidden z-50 space-y-2">
            {renderNewsRow(firstRow, "scroll-left")}
            {renderNewsRow(secondRow, "scroll-right")}
        </div>
    );
};

export default NewsTicker;
