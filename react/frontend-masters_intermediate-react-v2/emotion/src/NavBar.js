import React, { useState } from "react"
import { Link } from "@reach/router"
import { css, keyframes } from "@emotion/core"
import colors from "./colors"

const spin = keyframes`
  to {
    transform: rotate(360deg)
  }
`

const NavBar = () => {
  return (
    <header
      css={css`
        background-color: ${colors.secondary};
        padding: 15px;
      `}
    >
      <Link to="/">Adopt Me 2!</Link>
      <span
        css={css`
          font-size: 60px;
          display: inline-block;
          animation: 1s ${spin} linear infinite;

          &:hover {
            animation: 1s ${spin} linear infinite reverse;
            text-decoration: underline;
          }
        `}
        role="img"
        aria-label="logo"
      >
        🐩
      </span>
    </header>
  )
}

export default NavBar
