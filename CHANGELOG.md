Changelog
=========

[Unreleased]
------------
### Added
- This CHANGELOG.

#### Crowns info
- Additional crowns information for the current tree to the crowns pop-up menu 
or crowns side box depending of UI version.
- Display of maximum possible number of crowns along side total crowns earned.
- Display of tree's 'Crown Tree Level', the minimum number of crowns achieved 
for any normal skill in the tree.
- Breakdown of how many skills are at each crown level and how many crowns they 
contribute to the total crown count.
- Prediction of the number of days it will take to reach the next 
'Crown Tree Level'.

#### XP info
- Additional XP information for the current language to the Streak/Daily Goal 
pop-up menu or in a new side box depending of UI version.
- Display of total XP earned for the current language.
- Display of language level for the current language.
- Display of XP remaining to the next language level.
- Progress bar for the progress made towards the next language level including 
percentage and raw numbers of this progress.
- Prediction of the number of days it will take to reach the next language 
level.

#### Skill suggestions
- Displays a random skill of the lowest crown level as a practice suggestion if 
the the tree is fully strengthened.
- Focus is set on skill suggestion so that on exiting a lesson, return can be 
hit to take you to into practicing the suggested skill.

#### Options page
- Options page which is accessible via the 
[right click context menu](http://toransharma.com/i/2019-06-05_16-24-54.png) 
of the Duo Strength logo or via the extensions details. 
- Ability to enable or disable every feature and feature component.
- Ability to customise the behaviour of some features.
- Enable and disable all buttons.

### Changed
#### Needs Strengthening List
- Now shows, by default, 10 skills that need strengthening instead of every 
skill.
- Addition skills can be displayed by clicking show more. This adds another, by 
default, 10 skills.
- The number shown can be customised on the options page.

[v1.0.18] - 2019-06-11
----------------------

[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.0.18)
### Changed
- Fixed `topBarDiv` definition. It is now found and definied by its `className` 
rather than its `childNodes` relation to `dataReactRoot`.

[v1.0.17] - 2019-05-22
----------------------

[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.0.17)
### Changed
- Replaced every instance of `progress_3` with `skill_progress`, as duolingo has 
changed the key with which they store the crown level for each skill.

[v1.0.16] - 2019-05-15
----------------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.0.16)
### Changed
- Child node index used to select `topBarDiv` adjusted following addition of a 
new comment node above it.
- Check for location of main body element changed to check if it is in 4th 
place following addition of new comment node above it.

[v1.0.15] - 2019-05-04
----------------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.0.15)
### Changed
- Fixed typo of `append(...)` to `appendChild(...)` when adding `strengthenBox` 
as found in [issue #12](https://github.com/ToranSharma/Duo-Strength/issues/12).

### Removed
- Unnecessary and incorrect `margin-top` of `shopButtonFloatedDiv`.

[v1.0.14] - 2019-04-28
----------------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.0.14)
### Added
- Handling of the new white UI version to all functions affected.
- Use of the new UI handling only when `oldUI` is false, and the old procedure 
when it is true.

### Changed
- Repurposed `checkUIVersion` from checking if using the 'juicy' UI (which is now 
assumed) to checking if the white UI version is in use. This now sets the 
`oldUI` flag instead of `juicyUI`.
- Moved the removal of the old strength bars and strengthening list to earlier 
in the change language process. This stops any old data from showing up on the 
new tree.

### Removed
- `shopButtonFloatedDiv` when using the new white UI, as there is no longer a 
shop button at the top of the tree. Note it is still added when using the old 
UI.
- Output to console used in debugging that was left in the last release.

[v1.0.13] - 2019-04-24
----------------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.0.13)
### Changed
- Reworked the way we request the user data to help with handling language 
changes, especially quick successive language changes that happen while we were 
waiting for the new data.
- `checkUIVersion` now makes sure that we are on the main page before checking 
if the three is using the new juicy UI assets.

### Removed
- Global `numBonusSkillsInTree` value as it was only used when displaying the 
strengthening list and the value was passed into the function anyway.

[v1.0.12] - 2019-04-15
----------------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.0.12)
### Removed
- Display of 0 crown, i.e. unfinished, skills from the needs strengthening list.
- Strength bars from 0 crown, i.e. unfinished, skills.

The changes are in response to an update to the Spanish from English tree, 
where new skills were added in the middle of the tree. These new skills had 
varying strengths depending on overlap with on skills, causing skills which had 
not been started, let alone finished, to display as needing strengthening.

[v1.0.11] - 2019-04-08
----------------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.0.11)
### Added
- Updated `GOLD` and `RED` colours to match 'juicy' UI look.

### Changed
- `checkUIVersion` to check for the new 'juicy' UI version by checking the src 
of the crown assets. This now sets the `juicyUI` flag instead of the 
`newUIVersion` flag.
- Made text flow around shop button in the needs strengthening list.

[v1.0.10] - 2019-03-19
----------------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.0.10)
### Added
- Updated Login screen detection so that an error isn't thrown and the extension runs 
on first login without needing a refresh.

### Changed
- Fixed URL used to request the user data which caused issues in Firefox.

[v1.0.9] - 2019-03-15
---------------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.0.9)
### Added
- Handling of switches to and from the words page on language that have it.
- Wait and retry when displaying the needs strengthening list if the tree 
hasn't loaded yet, say after a page change.
- Tracking of if we are on the main page or not. This lets us stop the display 
processes if we switch away from the tree mid way through.

### Changed
- Fixed the location that the needs strengthening list is displayed on tree 
which had Part 1, Part 2 etc. headings, which duolingo has now removed.
- Fixed processing of tree to include selection of locked skills.

[v1.0.8] - 2019-03-15
---------------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.0.8)
### Changed 
- Fixed bug described in 
[issue #4](https://github.com/ToranSharma/Duo-Strength/issues/4) which caused
the strength bars not to update if they had already been displayed.

[v1.0.7] - 2019-03-12
---------------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.0.7)
### Changed
- Replaced every instance of `progress_1` with `progress_v3`, as duolingo has 
changed the key with which they store the crown level for each skill.

[v1.0.6] - 2019-03-01
---------------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.0.6)
### Changed
- Changed how the name element, where the strength bar for each skill is 
inserted, is selected to 
[fix issue #3](https://github.com/ToranSharma/Duo-Strength/issues/3). This is 
due to duolingo restructuring how the elements in each skill are laid out, 
which caused the extension not to display.

[v1.0.5] - 2019-02-26
---------------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.0.5)
### Added
- Firefox store info to the README.

### Changed
- Converted HTMLCollection to Array for increased compatibility. See 
[issue #2](https://github.com/ToranSharma/Duo-Strength/issues/2) for details.

[v1.0.4] - 2019-01-16
---------------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.0.4)
### Added
- Duo Strength to the Firefox Add-ons Store.
- Detection of the login screen, so that the exstension loads when logging in 
without having to refresh the page.

### Changed
- URL and its encoding made more explicit for compatibility with Firefox.
- Fixed ordering of bonus skill strength bars.
- Fixed handling of a fully strengthened tree.

[v1.0.3] - 2019-01-12
---------------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.0.3)
### Added
- Detection and handling of language change. Old data is removed and new data 
is requested then displayed.

### Changed
- Fixed display of strength for bonus skills, where the 5th and 6th skills 
would display the strength of the bonus skills, regardless of if those skills 
were the bonus skills or not. See 
[issue #1](https://github.com/ToranSharma/Duo-Strength/issues/1) for details.

[v1.0.2] - 2019-01-10
---------------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.0.2)
### Changed
- Skills that have yet to be started are no longer added to the needs 
strengthening list. These skills have a 0 strength value, as opposed to the 
normal minimum strength of 25% for a skill that has been started.

### Removed
- Unused tab permission which was causing a message to appear on install saying 
that the extension could read the user's browser history.

[v1.0.1] - 2019-01-09
---------------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.0.1)
### Added
- Chrome store link to README
- Screenshots to README
- Detection of new UI version used for some languages. This new duolingo UI 
splits the tree into different parts, headed Part 1, Part 2 etc. and adds 
pentagonal checkpoint nodes at the end of each part.

### Changed
- Use adjusted location of the needs strengthening list when using the new UI.

[v1.0.0] - 2019-01-08
---------------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.0.0)
### Added
- README
- MIT License
- Retrieval and parsing of user data from duolingo.com/users/USERNAME.
- Strength bars and strength percentages under each skill in the tree.
- Clickable list of skills that are not at full strength, and therefore need 
strengthening, above the first skill in the tree.
- Added handling of page changes: from the shop etc. to the main page; and 
from a lesson to the main page.

[Unreleased]: https://github.com/ToranSharma/Duo-Strength/compare/master...develop
[v1.0.18]: https://github.com/ToranSharma/Duo-Strength/compare/v1.0.17...v1.0.18
[v1.0.17]: https://github.com/ToranSharma/Duo-Strength/compare/v1.0.16...v1.0.17
[v1.0.16]: https://github.com/ToranSharma/Duo-Strength/compare/v1.0.15...v1.0.16
[v1.0.15]: https://github.com/ToranSharma/Duo-Strength/compare/v1.0.14...v1.0.15
[v1.0.14]: https://github.com/ToranSharma/Duo-Strength/compare/v1.0.13...v1.0.14
[v1.0.13]: https://github.com/ToranSharma/Duo-Strength/compare/v1.0.12...v1.0.13
[v1.0.12]: https://github.com/ToranSharma/Duo-Strength/compare/v1.0.11...v1.0.12
[v1.0.11]: https://github.com/ToranSharma/Duo-Strength/compare/v1.0.10...v1.0.11
[v1.0.10]: https://github.com/ToranSharma/Duo-Strength/compare/v1.0.9...v1.0.10
[v1.0.9]: https://github.com/ToranSharma/Duo-Strength/compare/v1.0.8...v1.0.9
[v1.0.8]: https://github.com/ToranSharma/Duo-Strength/compare/v1.0.7...v1.0.8
[v1.0.7]: https://github.com/ToranSharma/Duo-Strength/compare/v1.0.6...v1.0.7
[v1.0.6]: https://github.com/ToranSharma/Duo-Strength/compare/v1.0.5...v1.0.6
[v1.0.5]: https://github.com/ToranSharma/Duo-Strength/compare/v1.0.4...v1.0.5
[v1.0.4]: https://github.com/ToranSharma/Duo-Strength/compare/v1.0.3...v1.0.4
[v1.0.3]: https://github.com/ToranSharma/Duo-Strength/compare/v1.0.2...v1.0.3
[v1.0.2]: https://github.com/ToranSharma/Duo-Strength/compare/v1.0.1...v1.0.2
[v1.0.1]: https://github.com/ToranSharma/Duo-Strength/compare/v1.0.0...v1.0.1
[v1.0.0]: https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.0.0

