import { Button } from "@mui/material";
import {
	addFavorite,
	toggleFavorite,
	useIsSearchedCityInFavorites,
} from "../../../reducers/favorites";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSearchedCity } from "../../../reducers/searchedCity";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme: any) => ({
	addToFavor: {
		position: "absolute",
		right: 10,
		top: 20,
		"@media(max-width:600px)": {
			fontSize: "0.7em",
		},
	},
	favorIcon: {
		position: "absolute",
		right: 200,
		top: 20,
		"@media(max-width:600px)": {
			right: 160,
		},
	},
}));

export default function FavoriteSelection() {
	const isFavorite = useIsSearchedCityInFavorites();
	const searchedCity = useSearchedCity();
	const classes = useStyles();
	const dispatch = useDispatch();

	const handleToggleFavorite = () => {
		searchedCity && dispatch(toggleFavorite(searchedCity.id));
	};

	const handleAddFavorite = () => {
		searchedCity && !isFavorite && dispatch(addFavorite(searchedCity.id));
	};

	return (
		<>
			{isFavorite ? (
				<FavoriteIcon
					style={{ color: "red" }}
					onClick={handleToggleFavorite}
					className={classes.favorIcon}
					fontSize={"large"}
				/>
			) : (
				<FavoriteBorderIcon
					style={{ color: "red" }}
					onClick={handleToggleFavorite}
					className={classes.favorIcon}
					fontSize={"large"}
				/>
			)}
			<Button
				className={classes.addToFavor}
				variant="contained"
				onClick={handleAddFavorite}
			>
				{"Add To Favorites"}
			</Button>
		</>
	);
}
