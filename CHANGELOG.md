Changelog
=========

[Unreleased]
------------
-

[v2.0.1] - 2021-03-02
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v2.0.1)
### Added
- Multi part option to pick the order of boxes in the sidebar.
- Option to keep border around question text and buttons when hiding cartoons.

### Changed
- Focus Mode is no longer applied on pages other than the learn and tips pages.
- Wording of the option that hides the leauge table to be in the positive sense.

### Fixed
- Default options loading users with no saved options.
- Typos in options list.
- Flag borders tree level extraction from progress history.
- Show only needs attention option from trying to be applied on pages other than
  the learn page.
- Removal of L2 grammar skills from the skill suggestion choices on L2 trees.



[v2.0.0] - 2021-03-01
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v2.0.0)
### Added
- Focus mode which hides the sidebar and makes the main section of the page
  full width.
  - Option to enable and disable focus mode.
  - Button to bottom of the page to toggle the focus mode.
    - Option to enable and disabled the focus mode button.
- Button next to links in top of tree summary, to open that skill's popout
  bubble.
  - Options to toggle these buttons for the different lists.
- Suboption to the Focus First Skills Option to set the priority order for which
  of the lists at the top of the tree the focused link is from.
- Option to make sidebar fixed when scrolling down the page, and hidden content
  scrollable.
- Automatic clicking of new words in lessons to reveal their translations.
  - Option to enable and disable this behaviour.
- Option to only show skills in the tree that need to be addressed. This means
  cracked skills, skills that need strengthening, or a suggested skill to
  practise next.
- Button to skill popouts to mark skills as 'mastered', which forces their
  strength to be 100%. This can be used to ignore skills that are stuck needing
  strengthening.
  - Option to toggle the forcing of the skills marked as mastered to 100%.
  - Option to toggle the adding of the button in skill popouts.
  - Button in the options page to clear the list of mastered skills for the
    currently active tree.
- New box to the sidebar show the total strength of the tree, and a breakdown
  of how many skills are at each strength level. The total strength is the
  average strength of all the finished skills (crown level > 0), excluding bonus
  skills. Skills marked as mastered are considered as mentioned above as at 100%
  strength.
  - Option to enable and disable this box.
- Practise Button to top of tips pages.
  - Option to enable or disable this.
- A second set of buttons at the bottom of tips pages.
  - Option to enable or disable this.
- Option to hide the cartoon characters in lessons.
- Sub option to toggle the adding of the practise button to crown 0 skills

### Changed
- Option Page has been redesigned, and split into sections.
  - Buttons to disable all features and reset to default options.
  - Dark mode for options page.
- Grammar skills are now separated in the crowns info breakdown. There are
  options to disable this or hide the grammar skills breakdown.
- Tree levels are saved in the storage API, in a similar way to the progress
  history. These are now used in adding the border colour for the different
  trees show in the change language drop down. This is temporarily initialised
  by using the progress history saved data.
- All possible static styling has been changed from inline styles into an
  external style sheet.

### Fixed
- Suggested skill on for tree level 2 trees not to suggest grammar skills as
  they will not contribute towards getting to tree level 3.
- Selector for crowns popup container to not select lingots popup.

[v1.3.45] - 2020-12-21
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.3.45)
### Fixed
- Sentence text revealing after an incorrect response.
- Styling issue if user has an adblocker hiding the try plus button.

[v1.3.44] - 2020-12-17
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.3.44)
### Fixed
- Checkpoint popout selector to not select skill popouts on first load. This
  was causing the checkpoint retry buttons to be added to skill popouts that
  were open when the script adds its features.

[v1.3.43] - 2020-12-17
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.3.43)
### Fixed
- Updated checkpoint popout selector to new class names.
- Retry Test Out Challenge button on golden owl checkpoint  message to point to
 the challenge not the practice.

### Added
- PRACTICE +10 XP button to the golden owl checkpoint message that acts the
  same way as the duolingo added ones for the other checkpoints.

[v1.3.42] - 2020-12-10
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.3.42)
### Fixed
- Styling of messages at the top of the tree to make more room for the new try
  plus icon.

### Changed
- Any user+tree combinations for which the most recent progress history entry
  is more than 3 months ago is removed to save space as the tree is most likely
  inactive.
- Format of the key under which the progress history of a user tree is saved to
  use the user's ID rather than the username. This is to stop new entries being
  created if the user changes username. Any existing entries under the old
  format will be transferred to the new format then removed if the user uses
  that tree.

### Depreciated
- Old username based key format for saving the progress history. After 3 months
  the transferring of old format data will be stopped. This data will have
  either been transferred or deleted for being old.

[v1.3.41] - 2020-12-09
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.3.41)
### Fixed
- Progress history to only store 7 most recent improvements. This stops the
  storage from filling up with old data that will not be used.

[v1.3.40] - 2020-11-23
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.3.40)
### Changed
- Added back retry checkpoint challenge button to checkpoint popout even if
  there is a practice button.

[v1.3.39] - 2020-10-31
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.3.39)
### Changed
- Added backup extra condition for when testing if a skill element in the tree
  is a bonus skill or not. This is to try to and prevent an issue with a new
  German tree that cannot be directly tested.

[v1.3.38] - 2020-10-28
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.3.38)
### Fixed
- The tree level calculation now ignores grammar skills. This had caused the
  tree level to be stuck at level 2, the maximum level that grammar skills can
  get to.

[v1.3.37] - 2020-10-26
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.3.37)
### Fixed
- Class names and selectors of the elements in the navigation bars.

[v1.3.36] - 2020-10-20
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.3.36)
### Fixed
- Practice links to new grammar skills in lists at the top of the tree.
- Maximum crown count to account for grammar skills maximum possible crown
  level of 2.


[v1.3.35] - 2020-10-17
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.3.35)
### Fixed
- Strength bars on new grammar skills.
- Displaying of words list button on new grammar skills. The words in the list
  are currently placeholders and not helpful, so they shouldn't be shown.

### Added
- Option to add missing Test Out button to new grammar skills.

[v1.3.34] - 2020-10-02
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.3.34)
### Fixed
- Addition of retry buttons to the golden owl message overlay that is displayed
  when the golden owl checkpoint is clicked on.

[v1.3.33] - 2020-09-21
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.3.33)
### Fixed
- How the crowns progress graph handles apparent negative progress after a tree
  update adding new skills.

[v1.3.32] - 2020-09-04
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.3.32)
### Fixed
- How progress is recorded and handled after a tree update adding new skills.

[v1.3.31] - 2020-08-28
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.3.31)
### Fixed
- Incorrect cracked skills lists due to ambiguity in selecting the skill object
  from the userData based on the displayed name under the skill icon. Multiple
  skills can be labelled with the same 'short' name but refer to different
  skills with different a 'title'.
- Non-unique ids of strength bars due to the above ambiguity.
- Checkpoint popout selector.

### Changed
- Comment outlining HTML structure the skill tree has been moved to the end of
  the script and updated to detail the whole of the learn page.

[v1.3.30] - 2020-08-27
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.3.30)
### Fixed
- Selector of crowns total element to also pick grey 0 crowns.

### Added
- Consistent styling of text colour and crown img for 0 crowns in sidebar crowns
  info.

[v1.3.29] - 2020-08-18
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.3.29)
### Fixed
- Updated class names and selectors after Duolingo update.
- Flag borders are now only added if the username has been set, and the list is
  still there.
- Overflowing text in test out checkpoint buttons.

### Added
- Finnish flag detection for flag borders feature.

[v1.3.28] - 2020-08-05
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.3.28)
### Fixed
- Detection of cracked skills to also match a new updated class name for the
  cracked overlay.

[v1.3.27] - 2020-07-20
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.3.27)
### Fixed
- Detection of question changes and timed practice selection screen.

[v1.3.26] - 2020-07-01
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.3.26)
### Fixed
- Detection of cracked skills to also match updated class name for new overlay
  graphic.

[v1.3.25] - 2020-07-01
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.3.25)
### Fixed
- Translation text hiding for practices. Timed/untimed practice selection screen
  is now detected and handled.

[v1.3.24] - 2020-06-30
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.3.24)
### Fixed
- Skill names to use to short name instead of title. This makes the name of the
  skills shown in lists consistent with the name of the skill in the tree.
- Detection of cracked skills.
- Loading of extension after logging in.

### Changed
- Updated README introduction to match the User Guide's introduction on the
  wiki.

[v1.3.23] - 2020-06-29
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.3.23)
### Fixed
- Retry Level 1 Test Out button.

### Added
- Handling for new "PRACTICE +10XP" checkpoint buttons that are being tested on
  some trees.

[v1.3.22] - 2020-06-26
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.3.22)
### Fixed
- Handling of language changes with different base languages that took place on
  duolingo pages that Duo Strength does not run on, e.g. discussion or stories.

[v1.3.21] - 2020-06-26
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.3.21)
### Fixed
- Final checkpoint retry buttons not being added to the golden owl trophy
  message.
- Checkpoint retry button spacing in normal checkpoint popouts.

[v1.3.20] - 2020-06-25
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.3.20)
### Fixed
- Incorrect checked display of options that default as disabled.

[v1.3.19] - 2020-06-24
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.3.19)
### Fixed
- Detection of question changes and question check status.

[v1.3.18] - 2020-06-24
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.3.18)
### Fixed
- Detection of the replacement of the rootChild element.

[v1.3.17] - 2020-06-24
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.3.17)
### Fixed
- Translation hint popup hiding when translation sentences are being hidden.

[v1.3.16] - 2020-06-24
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.3.16)
### Fixed
- Lesson loaded detection errors that prevented text hiding from working when
  the lesson first loads.

[v1.3.15] - 2020-06-16
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.3.15)
### Fixed
- Firefox issue where the extension would not load due to the content script
  being injected after the body had loaded so the body.onload handler not
  being called.

[v1.3.14] - 2020-06-11
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.3.14)
### Fixed
- Error in tree level prediction using calendar.
- Number of lessons shown in current rate tooltip.
- Confusing references to crown level when tree level is meant.

[v1.3.13] - 2020-06-11
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.3.13)
### Changed
- The user's data file is now requested using their userId, which is taken from
  the pages cookies, where it is stored under the name `logged_out_uuid`. This
  is due to the issue that it is possible for a user's username can't be taken
  from the webpage itself, while the userId stored in the cookies is always
  there.
- The username is then defined once the user data has been received.
- Request id URL parameter renamed to avoid confusion with the userId.

### Fixed
- Initialisation of the extension when in mobile layout.
- Handling of switched between mobile and desktop layouts.

### Added
- Options to toggle the adding of the crowns and XP info in both the side bar
  and in the crown and streak popups.

[v1.3.12] - 2020-06-09
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.3.12)
### Changed
- Content script and page action page matches to include the preview subdomain.
- Increased scale on crown image behind crown count total to match old sizing.
  The image is now big enough to cover the widest maximum three digit crown
  total e.g. 999/999.

### Added
- Detection of no element with a link to the user's profile, and thus nowhere
  to the username from. An error message is send to the console in this case.
- Tooltip giving lesson rate and number of lessons left to the words
`current rate` in the prediction text for tree level and checkpoint
  predictions.

[v1.3.11] - 2020-05-18
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.3.11)
### Added
- Option to toggle the hiding of translation sentences that contain new words.

### Fixed
- Username extraction from page.

[v1.3.10] - 2020-05-05
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.3.10)
### Added
- Support of blue streak flame for mobile XP info adding. This may be from
  duolingo plus.

### Fixed
- Class name values for the top bar and its navigation buttons.
- Class name values for language change, crowns info and streak info popups.
- Handling of changing between mobile and desktop layout while crown and XP
  popups are displayed.

[v1.3.9] - 2020-05-03
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.3.9)
### Fixed
- Detection for Latin and Gaelic flags when adding the tree level flag borders.
- Handling of situation where an unpurchased skill is not added to the tree as a
  link to the shop. This happens when the page is loaded onto a tree without
  bonus skills, but is then the language is changed to one where there only one
  bonus skill that has been purchased.

[v1.3.8] - 2020-05-02
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.3.8)
### Added
- Maxiumum tree level message to crowns info popup.

### Changed
- Renamed 'Crown Level Prediction' option to 'Tree Level Prediction'.

### Fixed
- Detection of L0 skills for use in calculating the number of lessons until the
  next checkpoint.
- Crowns progress graph showing no progress when crowns info popup is already
  displayed when the features are added. The progress history is now always
  loaded first before adding features.

[v1.3.7] - 2020-05-01
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.3.7)
### Changed
- Reworded reveal sentence hotkey option to make it clearer that it is only
  affects the current sentence.
- Languages info now handles the case of there being no languages object of the
  user data being undefined. This would happen if the box is trying to be
  displayed before we have any userData.

### Fixed
- Detection of new words in sentences so that they are not hidden by the
  sentence hiding option.
- Handling of the extension loading on the courses or words page.

[v1.3.6] - 2020-04-19
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.3.6)
### Changed
- Checkpoint popout is opened then centred in the view when the tree is loaded
  after clicking one of the checkpoint redo buttons.

### Fixed
- Words list bubble being cut off if longer than the skill popout below.
- Removal of checkpoint and skill popout addition buttons on options changes.
- Handling of options changes when the golden owl congratulation message is
  displayed.

[v1.3.5] - 2020-04-18
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.3.5)
### Changed
- Skill popout is opened and then centred in the view when the tree is loaded
  after clicking the practise button.
- Skill selector to only choose skills that are children of a tree section.
  This removes a conflict with
[DuolingoNextLesson userscript](https://github.com/camiloaa/duolingonextlesson).

### Fixed
- Checkpoint redo buttons added to congratulation message shown when the golden
  owl which replaces the last checkpoint is clicked on.

[v1.3.4] - 2020-04-15
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.3.4)
### Fixed
- Practise Button removed from bonus skills as they are either L0 so unfinished
  or L1 and golden where only practising is possible.
- Practise Button and Words Button response to options update while popup is
  displayed.
- Enable/Disable Text Hiding button width to be consistent across browsers.

[v1.3.3] - 2020-04-13
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.3.3)
### Added
- Version number to options page heading for easy viewing.

### Changed
- hasMetGoal function has been updated to calculate XP earned today and compare
  that to the daily goal. Before it was checked if the streak had been extended
  today, but this is now possible without meeting the daily goal.
- Languages with 0 total XP are no longer displayed in the languages info box.

### Fixed
- Prediction dates by calendar to check if number of lessons for current
  language that are useable is not zero.
- Strength bar and skill suggestion handling of intro lesson when first
  starting a new language.

[v1.3.2] - 2020-04-13
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.3.2)
### Fixed
- Languages table update error.
- Words list for bonus skills.
- Handling for mixture of purchased and unpurchased bonus skills.

[v1.3.1] - 2020-04-12
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.3.1)
### Fixed
- Firefox issue with chrome runtime isInstalled check to prevent debug errors.

[v1.3.0] - 2020-04-12
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.3.0)
### Added
- Hotkey to reveal a hidden sentence. By default the hotkey is Ctrl+Alt+H.
  - Options to enable/disable hotkey and change key combination.
- New box in the side bar with a table of all the languages a user is
  learning from the current base language. It displays the Level, Total XP and
  XP to Next Level for each language.
  - Options to enable/disable this feature, and change the way the list is
  sorted, either by Language, XP or, XP to Next Level. You can also choose the
  reverse of any of these.
- Option to hide the league table from the side bar.
- Option to select the practice type for links in lists. The user can choose
  from "Lessons (Earn Crowns)", "Practice (Strengthen Only)" and "Lessons up to
  Threshold".
  - Option to change the crown level threshold from which point that skill's
    link is for practice not a lesson.
- Practise button to the popout for each skill. This allows you to practise
  a skill to strengthen it, without contributing towards earning crowns.
  - Option to enable or disable this practise button.
- Sub option to add a percentage value under total crowns count in crowns popup.
- Buttons to the completed checkpoint popouts to retry the checkpoint, or test
  out the skills above.
  - Option to enable or disable these buttons.
- Coloured border to the flags in the languages list to indicate the tree level
  of each tree. A white/no border indicates that the tree is level 0 (not
  completed), level 1 is blue, level 2 is green, level 3 is red, level 4 is
  orange and level 5 is gold with a crown icon added to the bottom left corner.
  - Option to enable or disable the borders around the flags.
- Option to enable or disable the display of the breakdown of bonus skills in
  the crowns popup box.
- Options to enable or disable the display of bonus skills in the needs
  strengthening list and the cracked skills list.
- Prediction to crowns info popup box of how long it will take to reach the next
  checkpoint for L0 trees.
  - Option to enable or disable this prediction.
- Words list button to the popout bubble for each skill. This button shows the
  list of words for that skill, including locked skills.

### Changed
- The extension is now a `page action`.
  - The Duo Strength Logo will now appear in the toolbar in all browsers.
  - Clicking on the logo will now open a popup window with the options page.
  - Modifying any of the options will cause the extension to refresh, displaying
    the new options.
- Cracked skills list is updated when skills are refreshed after first loading.
- The needs strengthening list sorting option has new criteria to sort by and
  can now be sorted by multiple criteria.
  - The list can now be sorted by skill strength and crown level, both ascending
    and descending.
  - You can add further sorting criteria if any of the above are chosen. These
    will define the order of any skills that are the same based on prior sorting
    criteria.
- The popout box that appears under a skill when it is clicked is now made sure
  to be in view when the page loads, or when a skill is clicked and the new
  practise button is added.
- Skill suggestions will only use new data. This is to prevent an invalid
  suggestion being shown when exiting a lesson and the old data is processed
  while waiting for new data to be retrieved.

### Fixed
- The progress for different trees with the same target language but different
  base languages are now differentiated and stored separately. This does mean
  however that the progress history for each tree will blank again after the
  update.
- Crowns progress graph Y axis label alignment in Firefox.

[v1.2.11] - 2020-03-31
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.2.11)
### Fixed
- Classname for bonus skill dividing lines. This fixes the adding of strength
  bars on trees with bonus skills.
- Show more link at end of lists briefly showing twice after a page change.

[v1.2.10] - 2020-03-30
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.2.10)
### Fixed
- Classname for new words in lessons. Detection of new words is now fixed so
  that sentences with new words are never hidden.

[v1.2.9] - 2020-03-30
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.2.9)
### Fixed
- Various classnames after Duolingo changes.
- Scaling of crowns images in crowns info popup.

[v1.2.8] - 2020-03-25
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.2.8)
### Fixed
- Fix for GitHub issue 51, where skill popout bubbles could not be interacted
  with when they were inline with the global practice button at the bottom of
  the page in desktop view.

[v1.2.7] - 2020-03-01
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.2.7)
### Fixed
- Applied previous versions fix to skill suggestion.

[v1.2.6] - 2020-03-01
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.2.6)
### Fixed
- Links in lists at the top of the page are now clickable in mobile layout. The
  container element for the lists at the top of the page is now forced to be on
  top of the skill tree if they are overlapping. This means that the click
  events are handled by the links now the skill tree.

[v1.2.5] - 2020-02-20
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.2.5)
### Fixed
- Crowns progress retrieval on first load.

[v1.2.4] - 2020-02-20
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.2.4)
### Fixed
- The root element is now checked to see if it has any children before trying to
  attach a observer to the root child element.
- Handling of multiple concurrent requests after a language change that arrive
  in a different order to the order they were sent in. Data from an older
  request arriving later is now only processed if it is for the current
  language.
- Cracked skills list styling when switching between mobile and desktop layouts.

### Changed
- User data request errors are now handled and the request will be retried after
  a 250ms wait.
- User data requests are responded to more cleanly through a mutation observer.
  This removes the unecessary 50ms timeout loop to check for the response.

[v1.2.3] - 2020-02-18
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.2.3)
### Fixed
- Detection of bonus skill row when adding strength bars.
- Spacing of strength bar under skill logo and above skill name.
- Moved Enable/Disable text hiding button next to question header to allow room
  for the new speech bubbles.
- Placement of XPInfo if streak popup box is visible when loading data. The
  sidebar box now has priority.

[v1.2.2] - 2020-01-21
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.2.2)
### Fixed
- Detection of left to right, or right to left sentences in translation
  questions.
- Classname for top of tree element. Old classname retained in case not all
  users have this change.

[v1.2.1] - 2020-01-10
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.2.1)
### Added
- New option to disable the focusing of the first skill in lists. This is added
  to combat the auto scrolling into view of the lists when reentering the tree
  from a lesson.

### Changed
- Changing between word bank and keyboard input on a translation question is now
  detected and the sentence is hidden after the switch.
- Enable/disable text hiding button is now floated according to the language
  text direction, right for LTR and left for RTL.

[v1.2.0] - 2020-01-09
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.2.0)
### Added
- New feature that lets the user hide the question text on translation
  question from the target language to the native language. Hiden text can be
  shown again by clicking the text.
- Option to enable or disable this feature in the options menu. The question
  text is shown by default.
- Button next to question text that can be hidden which toggles the hiding of
  the question text and saves that preference.
- Option to enable or disable the toggle button in the options menu. The button
  is shown by default.
- List of skills that are 'cracked' to top of the tree.
- Option to enable or disable the Cracked Skills List, and change its
  behaviour, similar to the Needs Strengthening List.

### Changed
- The first link in the needs strengthening list and the cracked skills list is
  now focused so that it can be opened quickly without using the mouse. The
  cracked skills list has priority over the needs strengthening list if both are
  being displayed.
- Skills suggestion detects checkpoints if the next skill is locked, and
  suggets the checkpoint to do next.

[v1.1.12] - 2019-11-07
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.1.12)
### Fixed
- Fixed class name change for cronws info popup window.
- Fixed styles for crowns logo and blurb in crowns info popup window.

[v1.1.11] - 2019-10-19
-----------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.1.11)
### Added
- Graph to the crowns info popup box showing the number of crown level
  contributing lessons done each day for the past week.
- Option to enable and disable this graph.

### Fixed
- Added check to new page change detection to catch pages that don't have
  a `topBarDiv`. This was causing an error on the login page and others.
- Needs strengthening list is removed (if there is one) before adding
  a skill suggestion (and vice versa). This fixes a bug where if a user goes
  from having skills that need strengthening to none, without a page refresh
(e.g. they didn't use the list itself), then the needs strengthing list would
  remain after the skill suggestion is added.

### Changed
- Crowns info popup box now has a maximum height, and overflowing
  content is now visible via a scroll bar. The max height is tailored to
  both mobile and desktop layouts.
- When in the mobile layout, the XP popup box now also has a maximum
  height, with overflowing content visible via a scroll bar.

[v1.1.10] - 2019-09-21
----------------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.1.10)
### Fixed
- Page change detection has been updated to include addition checks which
  allow for the current lack of the active tab class being applied to the
  learn tab. This is expected to be added back by duolingo so the current
  detection methods using class name changes on the learn tab.

[v1.1.9] - 2019-09-08
---------------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.1.9)
### Changed
- Modified how the name element of each skill is selected to be more
  general. It now is defined as the first (and likely only) element with the
  class name defined in `SKILL_NAME` that is a child of each element with
  class name defined in `SKILL_CONTAINER`. Similarly the icon element is
  selected by class name, not its relative relation to the container element.

### Fixed
- Fixed display suggestion to correctly try again after a wait if the page
  hasn't loaded fully yet.

[v1.1.8] - 2019-09-06
---------------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.1.8)
### Fixed
- Added check to see if skills have two container elements, and uses the
  inner most container.
- XP prediction is now fully separate from the XP breakdown and updates
  correctly.

[v1.1.7] - 2019-09-03
---------------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.1.7)
### Changed
- Crowns prediction is now considers the number of lessons left at the time of
  calculation instead of the last count used in caluclating the rate. This
  makes the prediction more accurate when the daily goal has yet to be met.
- Strength bars are now aligned with the skill above them, and the strength
  value is inside the bar itself.

[v1.1.6] - 2019-08-16
---------------------
[GitHub Release Page](https://github.com/ToranSharma/Duo-Strength/releases/tag/v1.1.6)
### Fixed
- Detection and definition of element at the top of the skill tree after a
  change in class name between in beta trees and fully developed trees.
- Added handling of new container element around each skill.

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
  information displayed at the top of the tree now has its width limited so
  that it doens't overlap with the button.

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
  as found in
  [issue #12](https://github.com/ToranSharma/Duo-Strength/issues/12).

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
  changes, especially quick successive language changes that happen while we
  were waiting for the new data.
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
  varying strengths depending on overlap with on skills, causing skills which
  had not been started, let alone finished, to display as needing strengthening.

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
[v2.0.1]: https://github.com/ToranSharma/Duo-Strength/compare/v2.0.0...v2.0.1
[v2.0.0]: https://github.com/ToranSharma/Duo-Strength/compare/v1.3.45...v2.0.0
[v1.3.45]: https://github.com/ToranSharma/Duo-Strength/compare/v1.3.44...v1.3.45
[v1.3.44]: https://github.com/ToranSharma/Duo-Strength/compare/v1.3.43...v1.3.44
[v1.3.43]: https://github.com/ToranSharma/Duo-Strength/compare/v1.3.42...v1.3.43
[v1.3.42]: https://github.com/ToranSharma/Duo-Strength/compare/v1.3.41...v1.3.42
[v1.3.41]: https://github.com/ToranSharma/Duo-Strength/compare/v1.3.40...v1.3.41
[v1.3.40]: https://github.com/ToranSharma/Duo-Strength/compare/v1.3.39...v1.3.40
[v1.3.39]: https://github.com/ToranSharma/Duo-Strength/compare/v1.3.38...v1.3.39
[v1.3.38]: https://github.com/ToranSharma/Duo-Strength/compare/v1.3.37...v1.3.38
[v1.3.37]: https://github.com/ToranSharma/Duo-Strength/compare/v1.3.36...v1.3.37
[v1.3.36]: https://github.com/ToranSharma/Duo-Strength/compare/v1.3.35...v1.3.36
[v1.3.35]: https://github.com/ToranSharma/Duo-Strength/compare/v1.3.34...v1.3.35
[v1.3.34]: https://github.com/ToranSharma/Duo-Strength/compare/v1.3.33...v1.3.34
[v1.3.33]: https://github.com/ToranSharma/Duo-Strength/compare/v1.3.32...v1.3.33
[v1.3.32]: https://github.com/ToranSharma/Duo-Strength/compare/v1.3.31...v1.3.32
[v1.3.31]: https://github.com/ToranSharma/Duo-Strength/compare/v1.3.30...v1.3.31
[v1.3.30]: https://github.com/ToranSharma/Duo-Strength/compare/v1.3.29...v1.3.30
[v1.3.29]: https://github.com/ToranSharma/Duo-Strength/compare/v1.3.28...v1.3.29
[v1.3.28]: https://github.com/ToranSharma/Duo-Strength/compare/v1.3.27...v1.3.28
[v1.3.27]: https://github.com/ToranSharma/Duo-Strength/compare/v1.3.26...v1.3.27
[v1.3.26]: https://github.com/ToranSharma/Duo-Strength/compare/v1.3.25...v1.3.26
[v1.3.25]: https://github.com/ToranSharma/Duo-Strength/compare/v1.3.24...v1.3.25
[v1.3.24]: https://github.com/ToranSharma/Duo-Strength/compare/v1.3.23...v1.3.24
[v1.3.23]: https://github.com/ToranSharma/Duo-Strength/compare/v1.3.22...v1.3.23
[v1.3.22]: https://github.com/ToranSharma/Duo-Strength/compare/v1.3.21...v1.3.22
[v1.3.21]: https://github.com/ToranSharma/Duo-Strength/compare/v1.3.20...v1.3.21
[v1.3.20]: https://github.com/ToranSharma/Duo-Strength/compare/v1.3.19...v1.3.20
[v1.3.19]: https://github.com/ToranSharma/Duo-Strength/compare/v1.3.18...v1.3.19
[v1.3.18]: https://github.com/ToranSharma/Duo-Strength/compare/v1.3.17...v1.3.18
[v1.3.17]: https://github.com/ToranSharma/Duo-Strength/compare/v1.3.16...v1.3.17
[v1.3.16]: https://github.com/ToranSharma/Duo-Strength/compare/v1.3.15...v1.3.16
[v1.3.15]: https://github.com/ToranSharma/Duo-Strength/compare/v1.3.14...v1.3.15
[v1.3.14]: https://github.com/ToranSharma/Duo-Strength/compare/v1.3.13...v1.3.14
[v1.3.13]: https://github.com/ToranSharma/Duo-Strength/compare/v1.3.12...v1.3.13
[v1.3.12]: https://github.com/ToranSharma/Duo-Strength/compare/v1.3.11...v1.3.12
[v1.3.11]: https://github.com/ToranSharma/Duo-Strength/compare/v1.3.10...v1.3.11
[v1.3.10]: https://github.com/ToranSharma/Duo-Strength/compare/v1.3.9...v1.3.10
[v1.3.9]: https://github.com/ToranSharma/Duo-Strength/compare/v1.3.8...v1.3.9
[v1.3.8]: https://github.com/ToranSharma/Duo-Strength/compare/v1.3.7...v1.3.8
[v1.3.7]: https://github.com/ToranSharma/Duo-Strength/compare/v1.3.6...v1.3.7
[v1.3.6]: https://github.com/ToranSharma/Duo-Strength/compare/v1.3.5...v1.3.6
[v1.3.5]: https://github.com/ToranSharma/Duo-Strength/compare/v1.3.4...v1.3.5
[v1.3.4]: https://github.com/ToranSharma/Duo-Strength/compare/v1.3.3...v1.3.4
[v1.3.3]: https://github.com/ToranSharma/Duo-Strength/compare/v1.3.2...v1.3.3
[v1.3.2]: https://github.com/ToranSharma/Duo-Strength/compare/v1.3.1...v1.3.2
[v1.3.1]: https://github.com/ToranSharma/Duo-Strength/compare/v1.3.0...v1.3.1
[v1.3.0]: https://github.com/ToranSharma/Duo-Strength/compare/v1.2.11...v1.3.0
[v1.2.11]: https://github.com/ToranSharma/Duo-Strength/compare/v1.2.10...v1.2.11
[v1.2.10]: https://github.com/ToranSharma/Duo-Strength/compare/v1.2.9...v1.2.10
[v1.2.9]: https://github.com/ToranSharma/Duo-Strength/compare/v1.2.8...v1.2.9
[v1.2.8]: https://github.com/ToranSharma/Duo-Strength/compare/v1.2.7...v1.2.8
[v1.2.7]: https://github.com/ToranSharma/Duo-Strength/compare/v1.2.6...v1.2.7
[v1.2.6]: https://github.com/ToranSharma/Duo-Strength/compare/v1.2.5...v1.2.6
[v1.2.5]: https://github.com/ToranSharma/Duo-Strength/compare/v1.2.4...v1.2.5
[v1.2.4]: https://github.com/ToranSharma/Duo-Strength/compare/v1.2.3...v1.2.4
[v1.2.3]: https://github.com/ToranSharma/Duo-Strength/compare/v1.2.2...v1.2.3
[v1.2.2]: https://github.com/ToranSharma/Duo-Strength/compare/v1.2.1...v1.2.2
[v1.2.1]: https://github.com/ToranSharma/Duo-Strength/compare/v1.2.0...v1.2.1
[v1.2.0]: https://github.com/ToranSharma/Duo-Strength/compare/v1.1.12...v1.2.0
[v1.1.12]: https://github.com/ToranSharma/Duo-Strength/compare/v1.1.11...v1.1.12
[v1.1.11]: https://github.com/ToranSharma/Duo-Strength/compare/v1.1.10...v1.1.11
[v1.1.10]: https://github.com/ToranSharma/Duo-Strength/compare/v1.1.9...v1.1.10
[v1.1.9]: https://github.com/ToranSharma/Duo-Strength/compare/v1.1.8...v1.1.9
[v1.1.8]: https://github.com/ToranSharma/Duo-Strength/compare/v1.1.7...v1.1.8
[v1.1.7]: https://github.com/ToranSharma/Duo-Strength/compare/v1.1.6...v1.1.7
[v1.1.6]: https://github.com/ToranSharma/Duo-Strength/compare/v1.1.5...v1.1.6
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

