import ImageGallery from "react-image-gallery";

const MyImageGallery =() => {
    const images = [
        {
            original: "https://cdn.pixabay.com/photo/2024/06/07/04/44/interior-8813800_640.jpg",
            thumbnail: "https://cdn.pixabay.com/photo/2024/06/07/04/44/interior-8813800_640.jpg",
        }, {
            original: "https://img.pikbest.com/wp/202347/high-quality-background-photograph-of-a-gaming-room-featuring-3d-rendered-computers-and-chairs_9769943.jpg!w700wp",
            thumbnail: "https://img.pikbest.com/wp/202347/high-quality-background-photograph-of-a-gaming-room-featuring-3d-rendered-computers-and-chairs_9769943.jpg!w700wp",
        }, {
            original: "https://cdn.pixabay.com/photo/2024/06/07/04/44/interior-8813800_640.jpg",
            thumbnail: "https://cdn.pixabay.com/photo/2024/06/07/04/44/interior-8813800_640.jpg",
        }, {
            original: "https://img.pikbest.com/wp/202347/high-quality-background-photograph-of-a-gaming-room-featuring-3d-rendered-computers-and-chairs_9769943.jpg!w700wp",
            thumbnail: "https://img.pikbest.com/wp/202347/high-quality-background-photograph-of-a-gaming-room-featuring-3d-rendered-computers-and-chairs_9769943.jpg!w700wp",
        }, {
            original: "https://img.pikbest.com/wp/202347/high-quality-background-photograph-of-a-gaming-room-featuring-3d-rendered-computers-and-chairs_9769943.jpg!w700wp",
            thumbnail: "https://img.pikbest.com/wp/202347/high-quality-background-photograph-of-a-gaming-room-featuring-3d-rendered-computers-and-chairs_9769943.jpg!w700wp",
        }, 
    ];
    return(
        <ImageGallery items={images}
        thumbnailPosition={'bottom'}
        originalHeight={'200px'}
        renderItem={(item) => {
            return (
                <div className="image-container">
                    <img className="rounded img-fluid" src={item.original} alt=""  style={{height: "450px", width:"100%"}}/>
                    <div className="caption">{item.description}</div>
                </div>
            );
        }}
    />
    );
}

export default MyImageGallery;