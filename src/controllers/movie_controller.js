import Movie from '../models/movie_model';
// import MovieValidation  from '../validations/Movie_validation';

class MovieController {
    static async getMovie(req, res) {  
        try{
            const dataArray = []
            
            const data = await Movie.find()
            console.log(data.length);
                        
            const response = {
                statusCode: 200,
                message: "Data Found",
                data: data
            }
            res.status(200).json(response)
        }catch(err){
            res.status(400).json({
                // message: "",
                error: err.message
            })
        }
        
    }

    static async postMovie(req, res) {
        const { body } = req;
        try{

            const data = await Movie.create(body)
            const response = {
                statusCode: 200,
                message: "Create Successfull",
                data: data
            }
            res.status(200).json(response)
        }catch(err){
            console.log("err", err);
            res.status(400).json({
                error: err.message
            })
        }
        
        
    }

    static async putMovie(req, res) {
        const { body } = req;
        const id = body.id;
        try{
            const token = req.cookies.access_token;
            if (!token) {
                return res.status(404).json({"message": "You are not authenticated"});
            }
            const data = await Movie.updateOne({id: id}, body )
            const response = {
                statusCode: 200,
                message: "Update Successfull",
                // data: data
            }
            res.status(200).json(response)
        }catch(err){
            res.status(400).json({
                // message: "",
                error: err.message
            })
        }
        
        
    }

    static async deleteMovie(req, res) {
        const { params } = req;
        const id = params.id;
        try{
            const token = req.cookies.access_token;
            if (!token) {
                return res.status(404).json({"message": "You are not authenticated"});
            }
            const data = await Movie.deleteOne({id: id})
            const response = {
                statusCode: 200,
                message: "Delete Successfull",
                
            }
            res.status(200).json(response)
        }catch(err){
            res.status(400).json({
                // message: "",
                error: err.message
            })
        }
        
        
    }

    static async findByIdMovie(req, res) {
        const { params } = req;
        const id = params.id;
        try{
            const data = await Movie.findById(id)
            const response = {
                statusCode: 200,
                message: "Data Found",
                data: data
                
            }
            res.status(200).json(response)
        }catch(err){
            res.status(400).json({
                // message: "",
                error: err.message
            })
        }
                
    }

}

export default MovieController;
