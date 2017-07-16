port module Main exposing (..)

import Html exposing (Html, text)


port suggestions : (String -> msg) -> Sub msg


type Msg
    = Suggestions String


type alias Model =
    String


init : ( Model, Cmd Msg )
init =
    ( "", Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions model =
    suggestions Suggestions


view : Model -> Html Msg
view model =
    text model


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Suggestions label ->
            ( label, Cmd.none )


main : Program Never Model Msg
main =
    Html.program
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
