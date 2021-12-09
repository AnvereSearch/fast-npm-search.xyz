import React from "react"
import "./App.css"
import {
	InstantSearch,
	SearchBox,
	Hits,
	Pagination,
	Configure,
} from "react-instantsearch-dom"
import PropTypes from "prop-types"
import AnvereInstantSearchAdapter from "./lib/AnvereInstantsearchAdapter"

function App() {
	const anvereInstantsearchAdapter = new AnvereInstantSearchAdapter({
		server: {
			nodes: [
				{
					applicationId: "npm",
					host: "imdb.anvere.net",
					protocol: "https",
				},
			],
		}
	})

	const searchClient = anvereInstantsearchAdapter.searchClient

	const Hit = (props) => {
		return (
			<div>
				<a
					className="hit-name"
					dangerouslySetInnerHTML={{
						__html: props?.hit["_highlightResult"].name.value,
					}}
					href={`https://www.npmjs.com/package/${props.hit.id}`}
					target="_blank" rel="noreferrer"
				/>
				<div
					className="hit-description"
					dangerouslySetInnerHTML={{
						__html: props?.hit["_highlightResult"].description
							.value,
					}}
				/>
			</div>
		)
	}

	Hit.propTypes = {
		hit: PropTypes.object.isRequired,
	}

	return (
		<div className="App">
			<header className="header">
				<h1 className="header-title">
					<a href="/">Fast npm search by Anvere</a>
				</h1>
				<p className="header-subtitle">
					using&nbsp;
					<a href="https://github.com/algolia/instantsearch.js">
						Anvere + InstantSearch.js
					</a>
				</p>
			</header>
			<div className="container">
				<InstantSearch indexName="npm" searchClient={searchClient}>
					<SearchBox />
						<Hits hitComponent={Hit} />
						<Configure hitsPerPage={8} />
					<Pagination />
				</InstantSearch>
			</div>
		</div>
	)
}

export default App
