module Main exposing (..)

import Html exposing (Html, div, main_, nav, ul, li, button, input, text, h1, h2, h3)
import Html.Events exposing (onClick)
import Html.Attributes exposing (class)
import Ports.Ports


init : ( Model, Cmd Msg )
init =
    ( { config = { databases = [] }
      , databases = []
      , subWindow = False
      }
    , Ports.Ports.getConfig ()
    )



-- Model


type alias Model =
    { config : Ports.Ports.FluidConfig
    , databases : List String
    , subWindow : Bool
    }



-- Messages


type Msg
    = Databases (List String)
    | Config Ports.Ports.FluidConfig
    | NewDB
    | LoadDB
    | ClickBackdrop
    | OpenDB
    | OpenDBResponse Ports.Ports.FluidConfig



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
        [ ul [] (list model.config.databases)
        ]


mainContent : Model -> Html Msg
mainContent model =
    main_ []
        [ button [ onClick NewDB ] [ text "New" ]
        , button [ onClick LoadDB ] [ text "Load" ]
        , button [ onClick OpenDB ] [ text "Open" ]
        ]


subWindow : Model -> List (Html Msg)
subWindow model =
    case model.subWindow of
        True ->
            [ div [ class "backdrop", onClick ClickBackdrop ] []
            , div [ class "modal" ] [ h1 [] [ text "Hello, World" ] ]
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
        Config config ->
            ( { model | config = config }, Cmd.none )

        OpenDBResponse config ->
            ( { model | config = config }, Cmd.none )

        Databases labels ->
            ( { model | databases = labels }, Cmd.none )

        NewDB ->
            ( { model | subWindow = True }, Cmd.none )

        LoadDB ->
            ( model, Ports.Ports.reqestDatabases () )

        ClickBackdrop ->
            ( { model | subWindow = False }, Cmd.none )

        OpenDB ->
            ( model, Ports.Ports.openDatabase () )



-- Subscriptions


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ Ports.Ports.responseDatabases Databases
        , Ports.Ports.getConfigResponse Config
        , Ports.Ports.openDatabaseResponse Config
        ]



-- Main


main : Program Never Model Msg
main =
    Html.program
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
