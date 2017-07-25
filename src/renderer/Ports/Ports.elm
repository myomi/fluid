port module Ports.Ports exposing (..)


port getConfig : () -> Cmd msg


port getConfigResponse : (FluidConfig -> msg) -> Sub msg


port openDatabase : () -> Cmd msg


port openDatabaseResponse : (FluidConfig -> msg) -> Sub msg


type alias FluidConfig =
    { databases : List DBPath
    }


type alias DBPath =
    String
