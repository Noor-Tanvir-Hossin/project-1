// import { Server } from "http"
import app from "./app"
import mongoose from "mongoose";
import config from "./app/config";

// const PORT = 5000

// let server:Server

// async function bootstrap () {

//     server = app.listen(PORT, () => {0
//         console.log(`app listening on port ${PORT}`)
//       })

// } 

// bootstrap()

async function main() {
  try {
      await mongoose.connect(config.database_url as string);
      app.listen(config.port, () => {
          console.log(`Example app listening on port ${config.port}`)
      })

  } catch (error) {
      console.log(error);

  }

}
main()
