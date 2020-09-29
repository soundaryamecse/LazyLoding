import React from 'react'
import axios from 'axios'

class LazyLoading extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state={
            search:"",
            images:[]
        }
    }
    handlechange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    handleSubmit=()=>{
        axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=c49ec7599a159d7993c28eb16ed61d33&text=${this.state.search}&format=json&nojsoncallback=1`)
        .then(res=> res.data.photos.photo)
        .then(res=>{
            const allImages=[]
            res.forEach(photo=>{
                allImages.push(`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`)
                    
            })
            this.setState({
                images:allImages
            },()=>console.log("images received"))
        })
    }
    componentDidUpdate(){
        console.log("in")
        const imageObserver = new IntersectionObserver(cb, {"threshold":"1"}) 

        const all_images = document.querySelectorAll('img.lazy_image')
        all_images.forEach(image => imageObserver.observe(image))


        function cb(entries){
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const lazyImage = entry.target
                    lazyImage.src = lazyImage.dataset.src
                }
            })
        }
    }

    render()
    {
        const {search,images}=this.state
        return(
            <div>
                <div>
                    <input type="text" name="search" value={search} placeholder="searchBar" onChange={this.handlechange}/>
                    <button onClick={this.handleSubmit}>Submit</button>
                </div>
                <div>
                    {images.length ? 
                    images.map(image => {
                        return(
                            <div>
                                <img className="lazy_image" src = "https://via.placeholder.com/300x300" data-src={image} alt="search results"/>    
                            </div>
                        )
                    }) :
                    <div>
                        Nothing to display    
                    </div>}
                </div>
            </div>
        )
    }
   
}

export default LazyLoading