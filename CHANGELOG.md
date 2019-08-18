Changelog
=========

[v1.1.7] - 2019-08-18
---------------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.1.7)
### Changed
- Strength bar is shorthened; strength text is put on the center of the strength bar.

[Unreleased]
------------
### Fixed
- Detection and definition of element at the top of the skill tree after a 
change in class name between in beta trees and fully developed trees.

### Changed
- Replaced all uses of duolingo class name strings with constants.

[v1.1.5] - 2019-08-07
---------------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.1.5)
### Added
- Detection of mobile layout, where the device or window width is smaller than 
700px wide.
- Handling of the mobile layout to all relevant functions.
- Detection and handling of moving between mobile and desktop layouts.

### Fixed
- Handling of needs strengthening lists with just one skill. The preceding `&` 
is no longer added.

[v1.1.4] - 2019-08-06
---------------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.1.4)
### Fixed
- Definition of the username from the url of the profile tab. Now makes sure to 
just use the text after the last `/`.

### Added
- Handling of the new TRY PLUS button at the top of the skill tree. Any 
information displayed at the top of the tree now has its width limited so that 
it doens't overlap with the button.

[v1.1.3] - 2019-08-01
---------------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.1.3)
### Added
- Added support for users that have had the Daily Goal box moved from the streak 
pop-up box to the side bar.

### Changed
- Applied hide zeros rows options to bonus skill rows in crowns breakdown.

[v1.1.2] - 2019-07-31
---------------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.1.2)
### Added
- Option to show or hide rows in the crowns breakdown, that have no skills at 
that level.

### Changed
- Added detection for IN BETA label at the top of beta trees so that the needs 
strengthening list or skill suggestion will be shown below this now.
- Options are now initially set to defauls and overwritten by the stored 
values. This allows any new options to be set to on first use, then saved in 
storage.

[v1.1.1] - 2019-07-30
---------------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.1.1)
### Changed
- Method for calculating current rate of XP gain reworked to count whole days, 
the method also only includes XP gained today if the goal has been met.
- Tweaked calendar method for calculating days to next crown level to only 
include any progress from today if the goal has been met.

### Removed
- Old UI (blue top navigation bar) detection and handling. It is assumed that 
all users have been changed to the new UI (white top naviagtion bar), so no 
users should be affected.

[v1.1.0] - 2019-07-29
---------------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.1.0)
### Added
- This CHANGELOG.

#### Crowns info
- Additional crowns information for the current tree to the crowns pop-up menu 
or crowns side box depending on the UI version.
- Display of maximum possible number of crowns alongside total crowns earned.
- Display of tree's 'Crown Tree Level', the minimum number of crowns achieved 
for any normal skill in the tree.
- Breakdown of how many skills are at each crown level and how many crowns they 
contribute to the total crown count.
- Prediction of the number of days it will take to reach the next 
'Crown Tree Level'.

#### XP info
- Additional XP information for the current language to the Streak/Daily Goal 
pop-up menu or in a new side box depending on the UI version.
- Display of total XP earned for the current language.
- Display of language level for the current language.
- Display of XP remaining to the next language level.
- Progress bar for the progress made towards the next language level including 
percentage and raw numbers of this progress.
- Prediction of the number of days it will take to reach the next language 
level.

#### Skill suggestions
- Displays a, by default, random skill of the lowest crown level as a practice 
suggestion if the tree is completed and fully strengthened.
- Displays the next skill to be learnt on incomplete, fully strengthened trees.
- Focus is set on skill suggestion so that on exiting a lesson, return can be 
hit to take you into practicing the suggested skill.
- The method for selecting the suggested skill can be customised on the options 
page.

#### Options page
- Options page which is accessible via the 
[right click context menu](https://toransharma.com/i/Duo%20Strength%20v1.1%20context%20menu.png) 
of the Duo Strength logo or via the extensions details. 
- Ability to enable or disable every feature and feature component.
- Ability to customise the behaviour of some features.
- Enable and disable all buttons.

### Changed
- Updated README screenshots and text to include new features.

#### Needs Strengthening List
- Now shows, by default, 10 skills that need strengthening instead of every 
skill.
- Additional skills can be displayed by clicking show more. This adds another, 
by default, 10 skills.
- The number shown can be customised on the options page.
- The order in which the list is sorted can be customised on the options page.

#### Strength Bars
- Non 100% strength bars now show in grey the width of a full strength bar to 
make more clear the progress that can be made for that skill.
- These backgrounds can be toggled on the options page.

## Depreciated
- Support of old UI version with the blue top navigation bar is being removed. 
All users should have been moved to the new UI version with the white 
navigation bar. Handling of the old UI will be removed in v1.1.1 to simplify 
the code.

[v1.0.22] - 2019-07-18
----------------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.0.22)
### Changed
- Fixed detection of if there exists the `topBarDiv` and thus if we are in a
lesson or not. This is in response to duolingo's removal of comment nodes in 
the tree.
- Fixed styling of strength bars where the width of the holder had matched the 
length of the title of the skill.
- Detection of bonus skill section of the tree updated to match new structure 
where the section is now marked by being sandwiched between two `div`s 
containing an `hr` rather than the row having a different class.
- Renamed `dataReactRoot` to `rootChild` as the data-react attribute has been 
removed from the element.
- `username` is now set by the end of the `href` of the profile tab button, 
rather than from the `href` of the achievement link. This allows the username 
to be set when the achievement box is not there, e.g. when in mobile layout.

[v1.0.21] - 2019-06-26
----------------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.0.21)
### Changed
- Fixed language changing issue as described in 
[issue #14](https://github.com/ToranSharma/Duo-Strength/issues/14).
- `language` is now set using the requested data rather than from the page 
itself.
- The number of active requests is now kept track of to help handle multiple 
language changes done in quick succession.
- Fixed handling of language change from pages other than the main page.

[v1.0.20] - 2019-06-20
----------------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.0.20)
### Changed
- Fixed issue on Firefox where the the data only loaded when 
first logging in to duolingo, as found in 
[issue #13](https://github.com/ToranSharma/Duo-Strength/issues/13). Data 
requests are now executed in the context of the document rather than the 
extension.

[v1.0.19] - 2019-06-17
----------------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.0.19)
### Changed
- Fixed handling of moving in and out of lessons. Follows on from v1.0.18 in 
updating an index that made incorrect after an update from duolingo.

### Removed
- Unnecessary duplicate requests in a few locations. Should be about half the 
amount of requests now.

[v1.0.18] - 2019-06-11
----------------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.0.18)
### Changed
- Fixed `topBarDiv` definition. It is now found and defined by its `className` 
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
- Repurposed `checkUIVersion` from checking if using the 'juicy' UI (which is 
now assumed) to checking if the white UI version is in use. This now sets the 
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
- Updated Login screen detection so that an error isn't thrown and the extension
 runs on first login without needing a refresh.

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
- Detection of the login screen, so that the extension loads when logging in 
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
[v1.1.5]: https://github.com/ToranSharma/Duo-Strength/compare/v1.1.4...v1.1.5
[v1.1.4]: https://github.com/ToranSharma/Duo-Strength/compare/v1.1.3...v1.1.4
[v1.1.3]: https://github.com/ToranSharma/Duo-Strength/compare/v1.1.2...v1.1.3
[v1.1.2]: https://github.com/ToranSharma/Duo-Strength/compare/v1.1.1...v1.1.2
[v1.1.1]: https://github.com/ToranSharma/Duo-Strength/compare/v1.1.0...v1.1.1
[v1.1.0]: https://github.com/ToranSharma/Duo-Strength/compare/v1.0.22...v1.1.0
[v1.0.22]: https://github.com/ToranSharma/Duo-Strength/compare/v1.0.21...v1.0.22
[v1.0.21]: https://github.com/ToranSharma/Duo-Strength/compare/v1.0.20...v1.0.21
[v1.0.20]: https://github.com/ToranSharma/Duo-Strength/compare/v1.0.19...v1.0.20
[v1.0.19]: https://github.com/ToranSharma/Duo-Strength/compare/v1.0.18...v1.0.19
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

