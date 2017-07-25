port module Ports.Ports exposing (..)


port getConfig : () -> Cmd msg


port getConfigResponse : (FluidConfig -> msg) -> Sub msg


port reqestDatabases : () -> Cmd msg


port responseDatabases : (List String -> msg) -> Sub msg


port openDatabase : () -> Cmd msg


port openDatabaseResponse : (FluidConfig -> msg) -> Sub msg


type alias FluidConfig =
    { databases : List String
    }
