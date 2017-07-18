port module Ports exposing (..)


port reqestDatabases : () -> Cmd msg


port responseDatabases : (List String -> msg) -> Sub msg
