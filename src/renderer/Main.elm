module Main exposing (..)

import Html exposing (Html, div, main_, nav, ul, li, button, input, text)
import Html.Events exposing (onClick)
import Html.Attributes exposing (class)
import Ports.Ports


init : ( Model, Cmd Msg )
init =
    { databases = []
    , subWindow = False
    }
        ! []



-- Model


type alias Model =
    { databases : List String
    , subWindow : Bool
    }



-- Messages


type Msg
    = Databases (List String)
    | NewDB
    | LoadDB
    | ClickBackdrop



-- View


view : Model -> Html Msg
view model =
    div []
        (List.append
            [ sideNavigation model
            , mainContent model
            ]
            (subWindow model)
        )


sideNavigation : Model -> Html Msg
sideNavigation model =
    nav []
        [ ul [] (list model.databases)
        , button [ onClick NewDB ] [ text "New" ]
        , button [ onClick LoadDB ] [ text "Load" ]
        ]


mainContent : Model -> Html Msg
mainContent model =
    main_ [] []


subWindow : Model -> List (Html Msg)
subWindow model =
    case model.subWindow of
        True ->
            [ div [ class "backdrop", onClick ClickBackdrop ] []
            ]

        False ->
            []


list : List String -> List (Html Msg)
list model =
    List.map row model


row : String -> Html Msg
row label =
    li [] [ text label ]



-- Update


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Databases labels ->
            ( { model | databases = labels }, Cmd.none )

        NewDB ->
            ( { model | subWindow = True }, Cmd.none )

        LoadDB ->
            ( model, Ports.Ports.reqestDatabases () )

        ClickBackdrop ->
            ( { model | subWindow = False }, Cmd.none )



-- Subscriptions


subscriptions : Model -> Sub Msg
subscriptions model =
    Ports.Ports.responseDatabases Databases



-- Main


main : Program Never Model Msg
main =
    Html.program
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
