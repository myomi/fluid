port module Ports.Ports exposing (..)


port reqestDatabases : () -> Cmd msg


port responseDatabases : (List String -> msg) -> Sub msg
