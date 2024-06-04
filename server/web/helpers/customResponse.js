const textPlainResponse = (ad) => {
    return (
        `Title: ${ad.title}\n` +
        `Author: ${ad.author.firstName} ${ad.author.lastName}\n` +
        `Published on: ${ad.updatedAt.toLocaleDateString()}\n` +
        `Category: ${ad.category}\n` +
        `Price: ${ad.price}\n` +
        `Content: ${ad.content}`
    );
};

const textHtmlResponse = (ad) => {
    return (
        `<html>
        <body>
        <h3>Title: ${ad.title}</h3>
        <h4>Author: ${ad.author.firstName} ${ad.author.lastName}</h4>
        <p>Published on: ${ad.updatedAt.toLocaleDateString()}</p>
        <p>Category: ${ad.category}</p>
        <p>Price: ${ad.price}</p>
        <p>Content: ${ad.content}</p>
        </body>
        </html>`
    );
};

module.exports = {textPlainResponse, textHtmlResponse}