module Main exposing (..)

import Html exposing (Html, nav, ul, li, button, input, text)
import Html.Events exposing (onClick)
import Ports


init : ( Model, Cmd Msg )
init =
    ( [], Cmd.none )



-- Model


type alias Model =
    List String


type alias Resource =
    { path : String
    , name : String
    }



-- Messages


type Msg
    = Suggestions (List String)
    | NewDB



-- View


view : Model -> Html Msg
view model =
    nav []
        [ ul [] (list model)
        , button [ onClick NewDB ] [ text "New" ]
        ]


list : Model -> List (Html Msg)
list model =
    List.map row model


row : String -> Html Msg
row label =
    li [] [ text label ]



-- Update


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Suggestions labels ->
            ( labels, Cmd.none )

        NewDB ->
            ( List.append [ "aaa" ] model, Cmd.none )



-- Subscriptions


subscriptions : Model -> Sub Msg
subscriptions model =
    Ports.suggestions Suggestions



-- Main


main : Program Never Model Msg
main =
    Html.program
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
