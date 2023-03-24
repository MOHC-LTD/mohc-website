import { getIconButtonUtilityClass, GlobalStyles, iconButtonClasses, touchRippleClasses } from '@mui/material'

const globalStyles = (
    <GlobalStyles
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        styles={(theme) => ({
            body: {
                overflowY: 'scroll',
            },
            [`.${touchRippleClasses.root}`]: {
                color: theme.palette.primary.main,
                [`.${iconButtonClasses.colorPrimary} &`]: {
                    color: theme.palette.primary.main,
                },
                [`.${iconButtonClasses.colorSecondary} &`]: {
                    color: theme.palette.secondary.main,
                },
                [`.${getIconButtonUtilityClass('colorInfo')} &`]: {
                    color: theme.palette.info.main,
                },
                [`.${getIconButtonUtilityClass('colorWarning')} &`]: {
                    color: theme.palette.warning.main,
                },
                [`.${getIconButtonUtilityClass('colorError')} &`]: {
                    color: theme.palette.error.main,
                },
                [`.${getIconButtonUtilityClass('colorSuccess')} &`]: {
                    color: theme.palette.success.main,
                },
            },
        })}
    />
)

export { globalStyles }
